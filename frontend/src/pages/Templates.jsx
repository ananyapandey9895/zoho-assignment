import React, { useState, useEffect } from 'react';
import { Layout, Palette, Check, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const Templates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('standard');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const res = await axios.get(`${API}/settings/organization`);
                setSelectedTemplate(res.data.selectedTemplate || 'standard');
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchOrg();
    }, []);

    const handleSelectTemplate = async (tplId) => {
        try {
            setSelectedTemplate(tplId);
            await axios.post(`${API}/settings/organization`, { selectedTemplate: tplId });
        } catch (err) { console.error('Error saving template:', err); }
    };

    const templates = [
        { id: 'standard', name: 'Standard', color: '#1a1c23', preview: '/images/standard.png' },
        { id: 'professional', name: 'Professional', color: '#0088FF', preview: '/images/professional.png' },
        { id: 'modern', name: 'Modern', color: '#10b981', preview: '/images/modern.png' },
        { id: 'creative', name: 'Creative', color: '#f59e0b', preview: '/images/creative.png' }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Invoice Templates</h1>
                    <p className="text-sm text-gray-500 mt-1">Choose a style that represents your brand</p>
                </div>
                <button className="bg-[#0088FF] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center hover:bg-[#0070d2] transition">
                    <Palette className="h-4 w-4 mr-2" /> Custom Template
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((tpl) => (
                    <div key={tpl.id}
                        onClick={() => handleSelectTemplate(tpl.id)}
                        className={`group cursor-pointer bg-white border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${selectedTemplate === tpl.id ? 'border-[#0088FF] ring-2 ring-blue-50' : 'border-gray-100'
                            }`}
                    >
                        <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                            <img src={tpl.preview} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold flex items-center shadow-lg">
                                    {selectedTemplate === tpl.id ? 'Selected' : 'Use Template'}
                                </button>
                            </div>
                            {selectedTemplate === tpl.id && (
                                <div className="absolute top-3 left-3 bg-[#0088FF] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center border border-white/20">
                                    <Check className="h-3 w-3 mr-1" /> Active
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white">
                            <span className={`text-sm font-bold ${selectedTemplate === tpl.id ? 'text-[#0088FF]' : 'text-gray-800'}`}>{tpl.name}</span>
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tpl.color }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center">
                        <Layout className="h-5 w-5 mr-3" /> Looking for something unique?
                    </h3>
                    <p className="text-sm text-blue-700 mt-1 max-w-lg">
                        You can customize every element of your invoice templates in the Template Gallery. Change fonts, colors, and layout instantly.
                    </p>
                </div>
                <button className="text-[#0088FF] hover:text-[#0070d2] font-semibold text-sm flex items-center">
                    Go to Gallery <ArrowRight className="h-4 w-4 ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Templates;
