import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ShieldCheck, Link as LinkIcon, Database, CheckCircle2, Box, Truck, Store } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 lg:py-40 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          VerifyX Mainnet v1.0 Live
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
          Verify Every Product. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Trust Every Journey.
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl">
          Connect physical products with secure digital identities. VerifyX provides immutable 
          supply-chain traceability and instant counterfeit detection using blockchain technology.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/verify" className="w-full sm:w-auto">
            <Button size="lg" icon={QrCode} className="w-full">Verify a Product</Button>
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full">Explore VerifyX</Button>
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">The Supply Chain, Secured.</h2>
            <p className="mt-4 text-slate-500">A transparent custody handoff from the factory floor to the customer's hands.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: '1. Manufacture', desc: 'Product is assigned a cryptographic identity.', icon: Box },
              { title: '2. Distribute', desc: 'Custody transfer is recorded on the ledger.', icon: Truck },
              { title: '3. Retail', desc: 'Inventory arrives and is marked for sale.', icon: Store },
              { title: '4. Verify', desc: 'Customer scans QR for instant authentication.', icon: QrCode },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm z-10 mb-6">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                {idx < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-slate-300" />}
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why VerifyX */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose VerifyX?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Product Authenticity', desc: 'Eradicate counterfeits with verifiable cryptographic proofs.', icon: ShieldCheck },
            { title: 'Tamper-Resistant', desc: 'Once data is written to the ledger, it cannot be altered.', icon: Database },
            { title: 'Transparent History', desc: 'Trace origin, materials, and complete supply-chain transit.', icon: LinkIcon },
            { title: 'Consumer Trust', desc: 'Empower buyers to verify purchases with a simple smartphone scan.', icon: CheckCircle2 },
          ].map((feature, idx) => (
            <Card key={idx} hoverEffect className="flex flex-col items-start p-8">
              <feature.icon className="w-8 h-8 text-blue-600 mb-6" />
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Section & CTA */}
      <section id="technology" className="bg-slate-900 text-white py-24 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Powered by Immutable Technology</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            VerifyX integrates Ethereum-compatible smart contracts, role-based access control, 
            and modern web infrastructure to create a zero-trust verification environment.
          </p>
          <Link to="/verify">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold border-none">
              Verify a Product Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}