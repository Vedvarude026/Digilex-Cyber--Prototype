import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
  Flame,
  ShieldAlert,
  Info,
  Server,
  Layers,
  ArrowRight,
  ExternalLink,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Filter
} from 'lucide-react';
import { MOCK_VULNERABILITIES, MOCK_ASSETS } from '../data/mockData';
import { formatINR } from '../utils/formatters';

interface HeatmapCellData {
  severityId: string; // 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  severityLabel: string;
  criticalityId: string; // 'TIER1' | 'TIER2' | 'TIER3' | 'TIER4'
  criticalityLabel: string;
  vulnerabilityCount: number;
  totalEal: number;
  maxCvss: number;
  riskScore: number; // 0 - 100
  items: Array<{
    cveId: string;
    assetName: string;
    cvssScore: number;
    eal: number;
    description: string;
    remediationCost: number;
    rosi: number;
  }>;
}

export const RiskHeatmap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [metricMode, setMetricMode] = useState<'eal' | 'count' | 'score'>('eal');
  const [selectedCell, setSelectedCell] = useState<HeatmapCellData | null>(null);
  const [hoveredCell, setHoveredCell] = useState<HeatmapCellData | null>(null);
  const [filterHotOnly, setFilterHotOnly] = useState<boolean>(false);

  // Axes Categories
  const severityLevels = [
    { id: 'CRITICAL', label: 'Critical (CVSS 9.0 - 10.0)', short: 'Critical' },
    { id: 'HIGH', label: 'High (CVSS 7.0 - 8.9)', short: 'High' },
    { id: 'MEDIUM', label: 'Medium (CVSS 4.0 - 6.9)', short: 'Medium' },
    { id: 'LOW', label: 'Low (CVSS 0.1 - 3.9)', short: 'Low' }
  ];

  const criticalityTiers = [
    { id: 'TIER4', label: 'Tier 4: Low / Internal', short: 'Tier 4 (Low)' },
    { id: 'TIER3', label: 'Tier 3: Operational', short: 'Tier 3 (Ops)' },
    { id: 'TIER2', label: 'Tier 2: Core Services', short: 'Tier 2 (Core)' },
    { id: 'TIER1', label: 'Tier 1: Crown Jewels', short: 'Tier 1 (Crown)' }
  ];

  // Map vulnerabilities & assets into matrix cells
  const buildMatrixData = (): HeatmapCellData[] => {
    const dataMap: Record<string, HeatmapCellData> = {};

    severityLevels.forEach((sev) => {
      criticalityTiers.forEach((crit) => {
        const key = `${sev.id}_${crit.id}`;
        dataMap[key] = {
          severityId: sev.id,
          severityLabel: sev.short,
          criticalityId: crit.id,
          criticalityLabel: crit.short,
          vulnerabilityCount: 0,
          totalEal: 0,
          maxCvss: 0,
          riskScore: 0,
          items: []
        };
      });
    });

    // Populate with mock vulnerabilities & assets
    MOCK_VULNERABILITIES.forEach((v) => {
      const asset = MOCK_ASSETS.find((a) => a.id === v.assetId);
      const critLevel = asset?.criticality === 'CRITICAL' ? 'TIER1'
        : asset?.criticality === 'HIGH' ? 'TIER2'
        : asset?.criticality === 'MEDIUM' ? 'TIER3'
        : 'TIER4';

      const sevLevel = v.cvssScore >= 9.0 ? 'CRITICAL'
        : v.cvssScore >= 7.0 ? 'HIGH'
        : v.cvssScore >= 4.0 ? 'MEDIUM'
        : 'LOW';

      const key = `${sevLevel}_${critLevel}`;
      if (dataMap[key]) {
        dataMap[key].vulnerabilityCount += 1;
        dataMap[key].totalEal += v.eal;
        dataMap[key].maxCvss = Math.max(dataMap[key].maxCvss, v.cvssScore);
        dataMap[key].items.push({
          cveId: v.cveId,
          assetName: v.assetName,
          cvssScore: v.cvssScore,
          eal: v.eal,
          description: v.description,
          remediationCost: v.remediationCost,
          rosi: v.rosi
        });
      }
    });

    // Add extra synthetic distribution so matrix looks rich
    const syntheticExtras = [
      { sev: 'CRITICAL', crit: 'TIER2', count: 3, eal: 4500000, items: [{ cveId: 'CVE-2026-50122', assetName: 'CORE-BANK-GW-02', cvssScore: 8.5, eal: 4500000, description: 'JWT Validation Bypass in API Gateway', remediationCost: 400000, rosi: 11.2 }] },
      { sev: 'HIGH', crit: 'TIER1', count: 5, eal: 8200000, items: [{ cveId: 'CVE-2026-11842', assetName: 'AWS Production Cluster', cvssScore: 8.7, eal: 8200000, description: 'IMDSv1 Service Exposure allowing SSRF', remediationCost: 200000, rosi: 18.2 }] },
      { sev: 'HIGH', crit: 'TIER2', count: 4, eal: 2800000, items: [{ cveId: 'CVE-2026-28103', assetName: 'SWIFT-MW-01', cvssScore: 8.2, eal: 2800000, description: 'Insecure Deserialization in Java Middleware', remediationCost: 300000, rosi: 9.3 }] },
      { sev: 'HIGH', crit: 'TIER3', count: 6, eal: 1800000, items: [{ cveId: 'CVE-2026-09122', assetName: 'IAM-AUTH-PROD-01', cvssScore: 7.8, eal: 1800000, description: 'LDAP Injection in Directory Search', remediationCost: 150000, rosi: 8.5 }] },
      { sev: 'MEDIUM', crit: 'TIER1', count: 8, eal: 1200000, items: [{ cveId: 'CVE-2026-10441', assetName: 'PAY-GW-PROD-01', cvssScore: 6.8, eal: 1200000, description: 'Outdated TLS cipher suite enabled', remediationCost: 80000, rosi: 15.0 }] },
      { sev: 'MEDIUM', crit: 'TIER2', count: 14, eal: 950000, items: [{ cveId: 'CVE-2026-33120', assetName: 'CUSTOMER-DB-02', cvssScore: 6.2, eal: 950000, description: 'Non-critical telemetry logging verbosity', remediationCost: 60000, rosi: 12.5 }] },
      { sev: 'MEDIUM', crit: 'TIER3', count: 22, eal: 650000, items: [{ cveId: 'CVE-2026-77810', assetName: 'STG-K8S-APP-01', cvssScore: 5.4, eal: 650000, description: 'Staging environment memory safety flaw', remediationCost: 50000, rosi: 3.2 }] },
      { sev: 'MEDIUM', crit: 'TIER4', count: 18, eal: 280000, items: [{ cveId: 'CVE-2026-88192', assetName: 'DEV-LAPTOP-042', cvssScore: 5.2, eal: 280000, description: 'Browser update pending on workstation', remediationCost: 20000, rosi: 2.1 }] },
      { sev: 'LOW', crit: 'TIER3', count: 35, eal: 150000, items: [{ cveId: 'CVE-2026-11002', assetName: 'INTERNAL-WIKI-01', cvssScore: 3.1, eal: 150000, description: 'Info disclosure header present', remediationCost: 10000, rosi: 1.5 }] },
      { sev: 'LOW', crit: 'TIER4', count: 52, eal: 90000, items: [{ cveId: 'CVE-2026-00412', assetName: 'BUILD-SLAVE-08', cvssScore: 2.4, eal: 90000, description: 'Banner grabbing information leak', remediationCost: 5000, rosi: 1.1 }] }
    ];

    syntheticExtras.forEach((extra) => {
      const key = `${extra.sev}_${extra.crit}`;
      if (dataMap[key]) {
        dataMap[key].vulnerabilityCount = Math.max(dataMap[key].vulnerabilityCount, extra.count);
        dataMap[key].totalEal = Math.max(dataMap[key].totalEal, extra.eal);
        if (dataMap[key].items.length === 0) {
          dataMap[key].items = extra.items;
        }
      }
    });

    // Compute normalized Risk Score (0 - 100)
    const maxEalInMatrix = Math.max(...Object.values(dataMap).map((d) => d.totalEal)) || 1;
    Object.values(dataMap).forEach((cell) => {
      const ealRatio = cell.totalEal / maxEalInMatrix;
      const countRatio = Math.min(1, cell.vulnerabilityCount / 50);
      cell.riskScore = Math.round(ealRatio * 70 + countRatio * 30);
    });

    return Object.values(dataMap);
  };

  const matrixData = buildMatrixData();

  // Draw Heatmap with D3
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawing

    const containerWidth = containerRef.current?.getBoundingClientRect().width || 750;
    const margin = { top: 40, right: 30, bottom: 60, left: 180 };
    const width = Math.max(300, containerWidth - margin.left - margin.right);
    const height = 340 - margin.top - margin.bottom;

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xCategories = criticalityTiers.map((c) => c.short);
    const yCategories = severityLevels.map((s) => s.short);

    // D3 Band Scales
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(xCategories)
      .padding(0.08);

    const yScale = d3
      .scaleBand()
      .range([0, height])
      .domain(yCategories)
      .padding(0.08);

    // Color Interpolator: Taupe Dark -> Cyan/Blue -> Amber -> Hot Crimson Rose
    const maxVal = Math.max(...matrixData.map((d) => d.totalEal)) || 1;
    const colorScale = d3
      .scaleSequential()
      .domain([0, maxVal])
      .interpolator(d3.interpolateRgbBasis(['#1E1915', '#24342F', '#92400E', '#B91C1C', '#F43F5E']));

    // Render X Axis (Asset Criticality)
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .select('.domain').remove();

    g.selectAll('.tick text')
      .attr('fill', '#cbd5e1')
      .attr('font-size', '11px')
      .attr('font-family', 'Plus Jakarta Sans')
      .attr('font-weight', '600')
      .attr('dy', '14px');

    // Render Y Axis (Vulnerability Severity)
    g.append('g')
      .call(d3.axisLeft(yScale).tickSize(0))
      .select('.domain').remove();

    // X Axis Title
    g.append('text')
      .attr('x', width / 2)
      .attr('y', height + 45)
      .attr('text-anchor', 'middle')
      .attr('fill', '#C5A059')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono')
      .attr('font-weight', 'bold')
      .text('BUSINESS ASSET CRITICALITY →');

    // Y Axis Title
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -150)
      .attr('text-anchor', 'middle')
      .attr('fill', '#C5A059')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono')
      .attr('font-weight', 'bold')
      .text('VULNERABILITY SEVERITY ↑');

    // Render Heatmap Cells
    const cellGroups = g
      .selectAll('.cell-group')
      .data(matrixData)
      .enter()
      .append('g')
      .attr('class', 'cell-group')
      .attr('transform', (d) => `translate(${xScale(d.criticalityLabel) || 0}, ${yScale(d.severityLabel) || 0})`);

    // Rectangles
    cellGroups
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('rx', 8)
      .attr('ry', 8)
      .attr('fill', (d) => (d.totalEal === 0 ? '#181411' : colorScale(d.totalEal)))
      .attr('stroke', (d) => {
        if (selectedCell && selectedCell.severityId === d.severityId && selectedCell.criticalityId === d.criticalityId) {
          return '#C5A059';
        }
        return '#3D332B';
      })
      .attr('stroke-width', (d) => {
        if (selectedCell && selectedCell.severityId === d.severityId && selectedCell.criticalityId === d.criticalityId) {
          return 3;
        }
        return 1;
      })
      .attr('cursor', 'pointer')
      .style('transition', 'all 0.2s ease')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .attr('stroke', '#C5A059')
          .attr('stroke-width', 2);
        setHoveredCell(d);
      })
      .on('mouseout', function (event, d) {
        if (!selectedCell || selectedCell.severityId !== d.severityId || selectedCell.criticalityId !== d.criticalityId) {
          d3.select(this)
            .attr('stroke', '#3D332B')
            .attr('stroke-width', 1);
        }
        setHoveredCell(null);
      })
      .on('click', (event, d) => {
        setSelectedCell(d);
      });

    // Hot Zone Glow Effect for Critical Tier 1
    cellGroups
      .filter((d) => d.severityId === 'CRITICAL' && d.criticalityId === 'TIER1')
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('rx', 8)
      .attr('ry', 8)
      .attr('fill', 'none')
      .attr('stroke', '#f43f5e')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4 2')
      .attr('pointer-events', 'none');

    // Cell Labels (Value Text)
    cellGroups
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', yScale.bandwidth() / 2 - 4)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', (d) => (d.totalEal > 5000000 ? '#ffffff' : '#f1f5f9'))
      .attr('font-size', '12px')
      .attr('font-family', 'JetBrains Mono')
      .attr('font-weight', 'bold')
      .attr('pointer-events', 'none')
      .text((d) => {
        if (metricMode === 'eal') {
          return d.totalEal > 0 ? formatINR(d.totalEal) : '—';
        } else if (metricMode === 'count') {
          return d.vulnerabilityCount > 0 ? `${d.vulnerabilityCount}` : '—';
        } else {
          return d.riskScore > 0 ? `${d.riskScore}/100` : '—';
        }
      });

    // Cell Subtext (Count or EAL secondary line)
    cellGroups
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', yScale.bandwidth() / 2 + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'Plus Jakarta Sans')
      .attr('pointer-events', 'none')
      .text((d) => {
        if (metricMode === 'eal') {
          return d.vulnerabilityCount > 0 ? `${d.vulnerabilityCount} vulns` : '';
        } else if (metricMode === 'count') {
          return d.totalEal > 0 ? formatINR(d.totalEal) : '';
        } else {
          return d.totalEal > 0 ? formatINR(d.totalEal) : '';
        }
      });

  }, [metricMode, selectedCell]);

  // Set default selection to Critical Crown Jewel on initial load
  useEffect(() => {
    const defaultHotCell = matrixData.find((d) => d.severityId === 'CRITICAL' && d.criticalityId === 'TIER1');
    if (defaultHotCell && !selectedCell) {
      setSelectedCell(defaultHotCell);
    }
  }, []);

  return (
    <div className="bg-[#241E1A] border border-[#3D332B] rounded-2xl p-5 shadow-xl space-y-5 font-sans">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#3D332B]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] font-bold uppercase tracking-widest mb-1">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500/20" />
            D3 Visual Risk Matrix
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Vulnerability Severity × Asset Criticality Heatmap
          </h3>
          <p className="text-xs text-slate-300 font-sans mt-0.5">
            Identify your organizational 'Hot Zones' by correlating threat severity with business asset value
          </p>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="bg-[#1B1713] p-1 rounded-xl border border-[#3D332B] flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setMetricMode('eal')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                metricMode === 'eal'
                  ? 'bg-[#C5A059] text-[#14100C] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Total EAL (₹)
            </button>
            <button
              onClick={() => setMetricMode('count')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                metricMode === 'count'
                  ? 'bg-[#C5A059] text-[#14100C] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vuln Count
            </button>
            <button
              onClick={() => setMetricMode('score')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                metricMode === 'score'
                  ? 'bg-[#C5A059] text-[#14100C] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Risk Index
            </button>
          </div>
        </div>
      </div>

      {/* Main Heatmap Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* D3 Heatmap Canvas */}
        <div ref={containerRef} className="lg:col-span-8 bg-[#1B1713] border border-[#3D332B] rounded-xl p-4 shadow-inner overflow-x-auto relative">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
              Interactive Matrix: Click any cell to inspect asset vulnerabilities
            </span>

            {hoveredCell && (
              <span className="text-[11px] font-mono font-bold text-[#C5A059] bg-[#C5A059]/15 px-2.5 py-0.5 rounded border border-[#C5A059]/30 animate-fade-in">
                {hoveredCell.severityLabel} × {hoveredCell.criticalityLabel}: {formatINR(hoveredCell.totalEal)}
              </span>
            )}
          </div>

          <svg ref={svgRef} className="w-full h-auto min-w-[500px]" />

          {/* D3 Color Scale Legend Bar */}
          <div className="mt-4 pt-3 border-t border-[#3D332B]/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">Cold Zone (Low Risk)</span>
              <div className="h-3 w-32 rounded-full bg-gradient-to-r from-[#1E1915] via-[#92400E] to-[#F43F5E] border border-[#3D332B]" />
              <span className="text-rose-400 font-bold">Hot Zone (Critical Threat)</span>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <span className="w-2.5 h-2.5 rounded bg-rose-500 border border-rose-400" />
              <span>Dashed outline = Hot Zone</span>
            </div>
          </div>
        </div>

        {/* Selected Cell Breakdown Inspector Drawer */}
        <div className="lg:col-span-4 bg-[#1B1713] border border-[#3D332B] rounded-xl p-4 shadow-lg space-y-4">
          {selectedCell ? (
            <div className="space-y-4">
              {/* Selected Header */}
              <div className="pb-3 border-b border-[#3D332B] flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        selectedCell.severityId === 'CRITICAL' && selectedCell.criticalityId === 'TIER1'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          : 'bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/40'
                      }`}
                    >
                      {selectedCell.severityId === 'CRITICAL' && selectedCell.criticalityId === 'TIER1'
                        ? '🔥 Hot Zone Selected'
                        : 'Matrix Cell Detail'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-sans">
                    {selectedCell.severityLabel} × {selectedCell.criticalityLabel}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    Impact assessment for correlated risk intersection
                  </p>
                </div>
              </div>

              {/* Stats Summary Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-[#241E1A] p-2.5 rounded-lg border border-[#3D332B]">
                  <p className="text-[10px] text-slate-400 uppercase">Total Loss (EAL)</p>
                  <p className="text-sm font-bold text-rose-400 mt-0.5">
                    {formatINR(selectedCell.totalEal)}
                  </p>
                </div>

                <div className="bg-[#241E1A] p-2.5 rounded-lg border border-[#3D332B]">
                  <p className="text-[10px] text-slate-400 uppercase">Vulnerabilities</p>
                  <p className="text-sm font-bold text-[#C5A059] mt-0.5">
                    {selectedCell.vulnerabilityCount} CVEs
                  </p>
                </div>

                <div className="bg-[#241E1A] p-2.5 rounded-lg border border-[#3D332B]">
                  <p className="text-[10px] text-slate-400 uppercase">Max CVSS</p>
                  <p className="text-sm font-bold text-amber-400 mt-0.5">
                    {selectedCell.maxCvss > 0 ? selectedCell.maxCvss : 'N/A'}
                  </p>
                </div>

                <div className="bg-[#241E1A] p-2.5 rounded-lg border border-[#3D332B]">
                  <p className="text-[10px] text-slate-400 uppercase">Risk Density</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {selectedCell.riskScore}/100
                  </p>
                </div>
              </div>

              {/* Correlated Vulnerabilities List */}
              <div className="space-y-2">
                <p className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Affected Assets & CVEs ({selectedCell.items.length})
                </p>

                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {selectedCell.items.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs font-sans">
                      No vulnerabilities recorded in this cell sector.
                    </div>
                  ) : (
                    selectedCell.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#241E1A] border border-[#3D332B] hover:border-[#C5A059]/40 rounded-lg p-2.5 space-y-1.5 transition text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[#C5A059] font-bold bg-[#C5A059]/10 px-1.5 py-0.5 rounded border border-[#C5A059]/30 text-[10px]">
                            {item.cveId}
                          </span>
                          <span className="font-mono text-rose-400 font-bold">
                            {formatINR(item.eal)}
                          </span>
                        </div>

                        <p className="text-white font-bold font-sans text-xs truncate">
                          {item.assetName}
                        </p>

                        <p className="text-[11px] text-slate-400 font-sans line-clamp-2 leading-tight">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-[#3D332B]/50">
                          <span>Cost: {formatINR(item.remediationCost)}</span>
                          <span className="text-emerald-400 font-bold">ROSI: {item.rosi}x</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Action Recommendation */}
              {selectedCell.severityId === 'CRITICAL' && selectedCell.criticalityId === 'TIER1' && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-xs space-y-1">
                  <p className="font-bold text-rose-400 flex items-center gap-1 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Hot Zone Action SLA: Immediate (24 Hours)
                  </p>
                  <p className="text-slate-300 font-sans text-[11px]">
                    Critical severity on crown jewel payment assets requires immediate emergency patch execution to eliminate ₹1.92 Cr loss potential.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Info className="w-6 h-6 mx-auto text-[#C5A059]" />
              <p className="text-xs font-sans">Click any cell in the heatmap matrix to inspect vulnerabilities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
