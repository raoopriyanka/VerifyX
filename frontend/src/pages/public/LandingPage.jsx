import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Truck, CheckCircle2, ArrowRight, Lock, Layers } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Decentralized Supply Chain Provenance
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Immutable Product Authentication & Supply Chain Traceability
        </h1>
        
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          VerifyX protects enterprise supply chains and consumer trust through cryptographic tracking, role-based custody transfers, and smart contract verification.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/verify">
            <Button size="lg" className="w-full sm:w-auto px-8 py-4">
              Verify a Product Now
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 bg-white">
              Enterprise Portal Login
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How VerifyX Works</h2>
            <p className="text-sm text-slate-600">
              A seamless four-tier lifecycle tracking products securely from factory floor to end consumer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">1</div>
              <h3 className="font-bold text-slate-900">Registration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manufacturers register products and batches onto the ledger with unique cryptographic IDs and QR codes.
              </p>
            </Card>

            <Card className="p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">2</div>
              <h3 className="font-bold text-slate-900">Custody Transfer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distributors accept incoming shipments and verify transit states through secure node handoffs.
              </p>
            </Card>

            <Card className="p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">3</div>
              <h3 className="font-bold text-slate-900">Retail Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shipments are routed to retail shelves with complete historical auditing preserved immutably.
              </p>
            </Card>

            <Card className="p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">4</div>
              <h3 className="font-bold text-slate-900">Consumer Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                End users scan QR codes instantly to validate product authenticity and combat counterfeit goods.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Supply Chain Section */}
      <section id="supply-chain" className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">End-to-End Supply Chain Visibility</h2>
            <p className="text-sm text-slate-600">
              Designed for manufacturers, logistics partners, and retailers to eliminate blind spots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Anti-Counterfeit Protection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cryptographically signed product entries ensure no unauthorized entity can duplicate or tamper with records.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Real-Time Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitor live inventory movement across multiple nodes from manufacturer workspace to distributor portals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Batch Auditing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Group products into batches and export full audit logs instantly for regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Cpu className="w-4 h-4" /> Robust Tech Stack
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Powered by Immutable Technology
          </h2>
          
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            VerifyX integrates Ethereum-compatible smart contracts, role-based access control, and modern web infrastructure to create a zero-trust verification environment.
          </p>

          <div className="pt-4">
            <Link to="/verify">
              <Button size="lg" className="px-8 py-4">
                Explore Product Verification <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}