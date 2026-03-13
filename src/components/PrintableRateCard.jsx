import React from 'react';
import { rateCardData } from '../data/rateCardData';
import logoUrl from '../Images/Logo for Nova Wealth - Wordmark Style.svg';

const PrintableRateCard = () => {
    return (
        <div className="hidden print:block bg-white text-nova-black font-sans p-8 max-w-[210mm] mx-auto min-h-screen">
            {/* Header Section */}
            <header className="flex justify-between items-start border-b-2 border-nova-gold pb-6 mb-8">
                <div>
                    <img src={logoUrl} alt="Nova Wealth Logo" className="w-[180px] h-auto object-contain mb-4" />
                    <h1 className="text-3xl font-bold tracking-tight text-nova-black uppercase">{rateCardData.header.title}</h1>
                    <p className="text-nova-gold font-semibold tracking-widest text-sm">{rateCardData.header.subtitle}</p>
                </div>
                <div className="text-right">
                    <p className="text-nova-gold font-bold text-lg">{rateCardData.header.effectiveDate}</p>
                    <p className="text-nova-gray-500 text-xs italic">{rateCardData.header.targetSegments}</p>
                </div>
            </header>

            {/* Approach */}
            <section className="mb-10 p-6 bg-nova-gray-50 border-l-4 border-nova-gold">
                <h2 className="text-lg font-bold mb-3 text-nova-navy tracking-wide uppercase">{rateCardData.approach.title}</h2>
                <p className="text-sm leading-relaxed text-nova-gray-700 italic">
                    "{rateCardData.approach.content}"
                </p>
            </section>

            {/* Loop through sections */}
            {rateCardData.sections.map((section) => (
                <section key={section.id} className="mb-12 break-inside-avoid">
                    <h3 className="text-xl font-bold mb-4 text-nova-navy border-b border-nova-gray-200 pb-2 flex items-center gap-3">
                        <span className="bg-nova-gold text-white text-xs px-2 py-1 rounded">S{section.id}</span>
                        {section.title}
                    </h3>

                    {section.subtitle && (
                        <p className="text-xs text-nova-gray-600 mb-4 italic leading-relaxed max-w-4xl">
                            {section.subtitle.replace(/"/g, '&quot;')}
                        </p>
                    )}

                    {/* Table Rendering */}
                    {(section.type === 'table' || section.type === 'performance_table' || section.type === 'props_table') && (
                        <div className="overflow-hidden border border-nova-gray-200 rounded-lg">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-nova-navy text-white uppercase tracking-wider">
                                        {section.headers.map((header, idx) => (
                                            <th key={idx} className="px-4 py-3 font-bold border-r border-white/10 last:border-r-0">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.rows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-nova-gray-50'}>
                                            {row.map((cell, cellIdx) => (
                                                <td key={cellIdx} className="px-4 py-3 border-r border-nova-gray-200 last:border-r-0 align-top">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Checklist Rendering */}
                    {section.type === 'checklist' && (
                        <div className="overflow-hidden border border-nova-gray-200 rounded-lg">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-nova-navy text-white uppercase tracking-wider">
                                        {section.headers.map((header, idx) => (
                                            <th key={idx} className="px-4 py-3 font-bold border-r border-white/10 last:border-r-0">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-nova-gray-200">
                                    {section.rows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className="hover:bg-nova-gray-50">
                                            <td className="px-4 py-2 font-medium bg-nova-gray-50/50">{row[0]}</td>
                                            {row.slice(1).map((val, idx) => (
                                                <td key={idx} className="px-4 py-2 text-center border-l border-nova-gray-200">
                                                    {val ? (
                                                        <span className="text-nova-gold font-bold">✔</span>
                                                    ) : (
                                                        <span className="text-nova-gray-300">——</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Performance Formula */}
                    {section.type === 'performance_table' && (
                        <div className="mt-4 p-4 bg-nova-gold/5 border border-nova-gold/20 rounded-lg">
                            <p className="text-xs font-bold text-nova-navy mb-2">CALCULATION FORMULA:</p>
                            <code className="text-[11px] block bg-white p-3 rounded border border-nova-gray-200 text-nova-black font-mono">
                                {section.formula}
                            </code>
                            <p className="text-[10px] text-nova-gray-500 mt-2 italic">
                                * {section.note}
                            </p>
                        </div>
                    )}

                    {/* List Rendering */}
                    {section.type === 'list' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item, idx) => {
                                const [label, ...desc] = item.split(':');
                                return (
                                    <div key={idx} className="p-4 bg-nova-gray-50 border border-nova-gray-200 rounded-lg">
                                        <p className="text-xs font-bold text-nova-navy mb-1 uppercase tracking-tight">{label}</p>
                                        <p className="text-[11px] text-nova-gray-600 leading-relaxed">{desc.join(':').trim()}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            ))}

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t-2 border-nova-navy flex flex-col items-center text-center space-y-4 break-inside-avoid">
                <p className="text-[10px] text-nova-gray-500 max-w-2xl uppercase tracking-tighter">
                    {rateCardData.footer.vatNote}
                </p>
                <div className="bg-nova-navy text-white px-6 py-2 rounded-full text-[11px] font-bold">
                    {rateCardData.footer.validity}
                </div>
                <p className="text-xs font-semibold text-nova-navy pt-2">
                    {rateCardData.footer.contact}
                </p>

                <div className="pt-8 opacity-20 flex justify-center grayscale pointer-events-none">
                    <img src={logoUrl} alt="Watermark" className="w-[120px] h-auto" />
                </div>
            </footer>
        </div>
    );
};

export default PrintableRateCard;
