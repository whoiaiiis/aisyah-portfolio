import { useState } from 'react';
import { Table, FileText, Database, BarChart3, Eye, X, ZoomIn, CheckCircle2, Download, Layers } from 'lucide-react';

export default function AdminPortfolio() {
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [activeSheet, setActiveSheet] = useState('RIVAI SIANG');
  const [activeDiagTab, setActiveDiagTab] = useState('erd');

  // Authentic sample rows from "DATA MEETING GARDU DIMAS (1).xlsx"
  const excelSampleData = {
    'RIVAI SIANG': [
      { no: '1', penyulang: 'ROWING', gardu: 'PA0001', merk: 'STARLITE', kapasitas: '630 kVA', tap: '3', alamat: 'JL. SULTAN AGUNG (3 ILIR)', tegangan: '20 kV' },
      { no: '2', penyulang: 'KAYAK', gardu: 'PA0002', merk: 'UNINDO', kapasitas: '1000 kVA', tap: '3', alamat: 'JL. LETKOL. SLAMET RIYADI', tegangan: '20 kV' },
      { no: '3', penyulang: 'SERIGALA', gardu: 'PA0003', merk: 'SINTRA', kapasitas: '160 kVA', tap: '3', alamat: 'JL. P. ANTASARI ( 16 ILIR )', tegangan: '20 kV' },
      { no: '4', penyulang: 'SERIGALA', gardu: 'PA0004', merk: 'SINTRA', kapasitas: '200 kVA', tap: '3', alamat: 'JL. KEBUMEN ( 16 ILIR )', tegangan: '20 kV' },
      { no: '5', penyulang: 'SERIGALA', gardu: 'PA0005', merk: 'UNINDO', kapasitas: '1000 kVA', tap: '3', alamat: 'JL. KERATON BENTENG (BKB)', tegangan: '20 kV' },
      { no: '6', penyulang: 'SINGA', gardu: 'PA0006', merk: 'STARLITE', kapasitas: '250 kVA', tap: '3', alamat: 'JL. SEKANAK', tegangan: '20 kV' },
      { no: '7', penyulang: 'DAYUNG', gardu: 'PA0010', merk: 'TRAFINDO', kapasitas: '315 kVA', tap: '3', alamat: 'JL. KAPT. A. RIVAI', tegangan: '20 kV' },
    ],
    'RIVAI MALAM': [
      { no: '1', penyulang: 'ROWING', gardu: 'PA0001', merk: 'STARLITE', kapasitas: '630 kVA', tap: '3', alamat: 'JL. SULTAN AGUNG (3 ILIR)', tegangan: '20 kV' },
      { no: '2', penyulang: 'KAYAK', gardu: 'PA0002', merk: 'UNINDO', kapasitas: '1000 kVA', tap: '3', alamat: 'JL. LETKOL. SLAMET RIYADI', tegangan: '20 kV' },
      { no: '3', penyulang: 'SERIGALA', gardu: 'PA0003', merk: 'SINTRA', kapasitas: '160 kVA', tap: '3', alamat: 'JL. P. ANTASARI ( 16 ILIR )', tegangan: '20 kV' },
      { no: '4', penyulang: 'SINGA', gardu: 'PA0006', merk: 'STARLITE', kapasitas: '250 kVA', tap: '3', alamat: 'JL. SEKANAK', tegangan: '20 kV' },
    ],
    'DATA ASIIK ULTRA': [
      { no: '1', penyulang: 'AKUATIK', gardu: 'PA0821', merk: 'GTT2', kapasitas: '100 kVA', tap: '—', alamat: 'Lat: -2.98025, Long: 104.75681', tegangan: '20 kV' },
      { no: '2', penyulang: 'AKUATIK', gardu: 'PA0166', merk: 'GTT2', kapasitas: '250 kVA', tap: '—', alamat: 'Lat: -2.98067, Long: 104.75715', tegangan: '20 kV' },
      { no: '3', penyulang: 'AKUATIK', gardu: 'PA0254', merk: 'GTT2', kapasitas: '250 kVA', tap: '—', alamat: 'Lat: -2.98099, Long: 104.75754', tegangan: '20 kV' },
    ],
  };

  const diagrams = {
    erd: {
      title: 'Entity Relationship Diagram (ERD)',
      subtitle: 'System Database Schema & Relationship Mapping',
      src: '/admin/erd_diagram.png',
      desc: 'Complete Entity Relationship Diagram modeling core entities, primary keys, foreign keys, and cardinalities developed for information system architecture.',
    },
    relasi: {
      title: 'Database Relational Mapping',
      subtitle: 'Table Relationships & Data Structure Model',
      src: '/admin/database_relasi_p1.jpg',
      desc: 'Normalized relational schema illustrating normalized tables, attribute data types, and referential integrity constraints.',
    },
    class: {
      title: 'Class Diagram Architecture',
      subtitle: 'Object-Oriented Structure & Method Specifications',
      src: '/admin/class_diagram.png',
      desc: 'UML Class Diagram defining controller classes, model entities, database access methods, and operational associations.',
    },
  };

  return (
    <section id="admin-portfolio" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-xs font-semibold text-accent mb-3">
            Authentic Work Showcase
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Administrative & Data Management
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>
        <p className="text-center text-text-muted text-base lg:text-lg max-w-3xl mx-auto mb-16 reveal">
          Demonstrated practical competencies in operational data processing, Microsoft Excel recapitulation, database entity modeling, and structured technical documentation from real-world professional internship and academic systems.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* CARD 1: EXCEL DATA MANAGEMENT */}
          <div className="reveal bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Table size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">
                      Excel Data Management
                    </h3>
                    <p className="text-xs text-text-muted">
                      File: <span className="font-mono text-primary font-semibold">DATA MEETING GARDU DIMAS (1).xlsx</span>
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 shrink-0">
                  Verified Data
                </span>
              </div>

              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Real operational data management and technical entry of electrical distribution transformer (gardu distribusi) measurement records at PT PLN (Persero) ULP Rivai.
              </p>

              {/* Sheet selector tabs */}
              <div className="flex gap-2 border-b border-border/50 pb-2 mb-3 overflow-x-auto">
                {Object.keys(excelSampleData).map((sheetName) => (
                  <button
                    key={sheetName}
                    onClick={() => setActiveSheet(sheetName)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeSheet === sheetName
                        ? 'bg-accent text-white font-semibold'
                        : 'bg-bg-light text-text-muted hover:text-primary hover:bg-gray-200'
                    }`}
                  >
                    Sheet: {sheetName}
                  </button>
                ))}
              </div>

              {/* Spreadsheet table preview */}
              <div className="overflow-x-auto border border-border/50 rounded-xl bg-neutral-900 text-white mb-4">
                <table className="w-full text-xs">
                  <thead className="bg-neutral-800 text-neutral-300 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-3 py-2.5 text-left">No</th>
                      <th className="px-3 py-2.5 text-left">Penyulang</th>
                      <th className="px-3 py-2.5 text-left">No Gardu</th>
                      <th className="px-3 py-2.5 text-left">Merk Trafo</th>
                      <th className="px-3 py-2.5 text-left">Kapasitas</th>
                      <th className="px-3 py-2.5 text-left">Tap</th>
                      <th className="px-3 py-2.5 text-left">Alamat / Lokasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-[11px] font-mono">
                    {excelSampleData[activeSheet].map((row) => (
                      <tr key={row.no} className="hover:bg-neutral-800/60 transition-colors">
                        <td className="px-3 py-2 text-neutral-400">{row.no}</td>
                        <td className="px-3 py-2 text-accent font-semibold">{row.penyulang}</td>
                        <td className="px-3 py-2 text-emerald-400 font-bold">{row.gardu}</td>
                        <td className="px-3 py-2 text-neutral-200">{row.merk}</td>
                        <td className="px-3 py-2 text-amber-300">{row.kapasitas}</td>
                        <td className="px-3 py-2 text-neutral-300">{row.tap}</td>
                        <td className="px-3 py-2 text-neutral-300 truncate max-w-[150px]">{row.alamat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Formula & operations tags */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Excel Functions & Administrative Operations
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Data Entry & Recapitulation',
                    'VLOOKUP',
                    'SUMIF',
                    'IF Conditions',
                    'PivotTable Summary',
                    'Transformer Load Balancing',
                  ].map((fn) => (
                    <span
                      key={fn}
                      className="px-2.5 py-1 bg-accent/10 text-accent font-medium text-xs rounded-md border border-accent/20"
                    >
                      {fn}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>Source: PT PLN (Persero) ULP Rivai</span>
              <span className="font-semibold text-primary">1,007 Gardu Units Recapitulated</span>
            </div>
          </div>

          {/* CARD 2: ADMINISTRATIVE DOCUMENTATION */}
          <div className="reveal bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">
                      Administrative Documentation
                    </h3>
                    <p className="text-xs text-text-muted">
                      System Modeling & Technical Documentation
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 shrink-0">
                  Technical Docs
                </span>
              </div>

              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Structured system modeling and documentation created for academic and internship systems, defining functional procedures, user access rights, and entity workflows.
              </p>

              {/* Documentation items list */}
              <div className="space-y-2.5 mb-5">
                {[
                  {
                    title: 'System Entity Relationship & Data Dictionary',
                    detail: 'Formal schema mapping tables, primary keys, and data constraints.',
                  },
                  {
                    title: 'Procedural Terms of Reference & Activity LPJ',
                    detail: 'Compilation of event accountability reports, budgets, and agendas.',
                  },
                  {
                    title: 'Incoming / Outgoing Correspondence Log',
                    detail: 'Indexing and archival protocol for official organizational correspondence.',
                  },
                  {
                    title: 'Memorandum of Understanding (MoU) Management',
                    detail: 'Formalized documentation and bilateral agreement administration.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-bg-light border border-border/40 flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-primary">{item.title}</p>
                      <p className="text-xs text-text-muted leading-snug mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick preview button */}
              <button
                onClick={() => setSelectedDiagram(diagrams.class)}
                className="w-full py-2.5 px-4 bg-bg-light hover:bg-accent/10 border border-border hover:border-accent text-xs sm:text-sm font-semibold text-primary hover:text-accent rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Eye size={15} />
                View System Architecture Diagram
              </button>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>Methodology: Standardized UML & ERD</span>
              <span className="font-semibold text-primary">Academic & Org Compliant</span>
            </div>
          </div>

          {/* CARD 3: DATABASE MANAGEMENT */}
          <div className="reveal bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Database size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">
                      Database Management
                    </h3>
                    <p className="text-xs text-text-muted">
                      Entity Relationship Diagram & Relational Modeling
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200 shrink-0">
                  Authentic Schema
                </span>
              </div>

              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Design and normalization of database schemas, entity relationships, primary/foreign key integrity, and table architectures created using Draw.io for actual information systems.
              </p>

              {/* Diagram switcher tabs */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setActiveDiagTab('erd')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeDiagTab === 'erd'
                      ? 'bg-accent text-white font-semibold'
                      : 'bg-bg-light text-text-muted hover:text-primary'
                  }`}
                >
                  ERD Diagram
                </button>
                <button
                  onClick={() => setActiveDiagTab('relasi')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeDiagTab === 'relasi'
                      ? 'bg-accent text-white font-semibold'
                      : 'bg-bg-light text-text-muted hover:text-primary'
                  }`}
                >
                  Relational Schema
                </button>
              </div>

              {/* Diagram interactive preview card */}
              <div
                className="group relative h-56 bg-neutral-950 rounded-xl overflow-hidden border border-border/50 cursor-pointer flex items-center justify-center p-3"
                onClick={() => setSelectedDiagram(diagrams[activeDiagTab])}
              >
                <img
                  src={diagrams[activeDiagTab].src}
                  alt={diagrams[activeDiagTab].title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* Hover overlay banner */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4 text-center">
                  <ZoomIn size={24} className="text-accent" />
                  <p className="text-xs font-semibold">Click to Zoom & View Full Diagram</p>
                  <p className="text-[11px] text-white/70">Inspect all table entities and relationship lines</p>
                </div>

                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm rounded-md text-white text-[10px] font-mono flex items-center gap-1">
                  <ZoomIn size={11} className="text-accent" />
                  Click to Enlarge
                </div>
              </div>

              <p className="text-xs text-text-muted mt-3">
                * Features complete multi-entity relationships, normalization, foreign keys, and attribute data types.
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>Tools: Draw.io & MySQL</span>
              <button
                onClick={() => setSelectedDiagram(diagrams[activeDiagTab])}
                className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
              >
                View Full Size →
              </button>
            </div>
          </div>

          {/* CARD 4: REPORTING & DOCUMENTATION */}
          <div className="reveal bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <BarChart3 size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">
                      Reporting & Operational Recapitulation
                    </h3>
                    <p className="text-xs text-text-muted">
                      Technical Summary from PT PLN ULP Rivai
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200 shrink-0">
                  Operational Metrics
                </span>
              </div>

              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Authentic summary of electrical distribution infrastructure managed and recapitulated during professional internship at PT PLN (Persero) ULP Rivai:
              </p>

              {/* Real Metric Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 bg-bg-light rounded-xl border border-border/40 text-center">
                  <p className="text-2xl font-bold text-primary font-heading">1,007</p>
                  <p className="text-xs text-text-muted mt-0.5">Distribution Substations (Gardu)</p>
                </div>
                <div className="p-3.5 bg-bg-light rounded-xl border border-border/40 text-center">
                  <p className="text-2xl font-bold text-accent font-heading">189,270</p>
                  <p className="text-xs text-text-muted mt-0.5">Total Capacity (kVA)</p>
                </div>
                <div className="p-3.5 bg-bg-light rounded-xl border border-border/40 text-center">
                  <p className="text-2xl font-bold text-primary font-heading">58</p>
                  <p className="text-xs text-text-muted mt-0.5">Active Feeders (Penyulang)</p>
                </div>
                <div className="p-3.5 bg-bg-light rounded-xl border border-border/40 text-center">
                  <p className="text-2xl font-bold text-primary font-heading">2 Shifts</p>
                  <p className="text-xs text-text-muted mt-0.5">Siang & Malam Peak Logging</p>
                </div>
              </div>

              {/* Feeder Distribution Breakdown */}
              <div className="space-y-2 mb-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                  Representative Distribution Feeders (Penyulang)
                </p>
                {[
                  { name: 'Rowing (PA0001 - Starlite 630 kVA)', pct: '90%' },
                  { name: 'Kayak (PA0002 - Unindo 1000 kVA)', pct: '100%' },
                  { name: 'Serigala (PA0003 - Sintra 160 kVA)', pct: '60%' },
                  { name: 'Singa (PA0006 - Starlite 250 kVA)', pct: '75%' },
                  { name: 'Dayung (PA0010 - Trafindo 315 kVA)', pct: '80%' },
                ].map((item, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between text-text-dark font-medium mb-1">
                      <span>{item.name}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-accent h-full rounded-full transition-all duration-500"
                        style={{ width: item.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>Data Source: DATA MEETING GARDU DIMAS (1).xlsx</span>
              <span className="font-semibold text-primary">PT PLN (Persero) ULP Rivai</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Size Diagram Lightbox Modal */}
      {selectedDiagram && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => setSelectedDiagram(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 flex items-start justify-between p-5 border-b border-border/50">
              <div>
                <span className="px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                  Original Documentation Asset
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary mt-1">
                  {selectedDiagram.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted">{selectedDiagram.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedDiagram(null)}
                aria-label="Close modal"
                className="p-2 text-text-muted hover:text-primary hover:bg-bg-light rounded-xl transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Image Body with Zoom Capability */}
            <div className="p-4 sm:p-6 bg-neutral-950 flex flex-col items-center justify-center min-h-[400px]">
              <img
                src={selectedDiagram.src}
                alt={selectedDiagram.title}
                className="max-h-[650px] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
              <p className="text-xs text-neutral-400 mt-3 text-center">
                High-resolution architectural diagram modeling authentic table structures, foreign keys, and data relationships.
              </p>
            </div>

            {/* Modal Description & Footer */}
            <div className="p-5 bg-bg-light/80 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
                {selectedDiagram.desc}
              </p>
              <button
                onClick={() => setSelectedDiagram(null)}
                className="px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-accent transition-colors shrink-0"
              >
                Close Diagram
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
