/* Milestone Payment Modal */
import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Landmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PayMilestoneModal: React.FC = () => {
  const { activeModal, closeModal, payMilestone } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeModal.type !== 'pay_milestone' || !activeModal.payload) {
    return null;
  }

  const { projectId, milestoneId, milestoneName, amount } = activeModal.payload;
  const paymentAmount = amount || 20000;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (projectId && milestoneId) {
        payMilestone(projectId, milestoneId);
      }
      setIsProcessing(false);
      closeModal();
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Release Milestone Payment</h3>
          <button className="modal-close-btn" onClick={closeModal}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '16px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--space-4)',
              border: '1px solid var(--border-default)'
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Payment For</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {milestoneName || 'Milestone Delivery'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Amount</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand-primary)' }}>
                ₹{paymentAmount.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Select Payment Method</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${selectedMethod === 'card' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                  backgroundColor: selectedMethod === 'card' ? 'var(--brand-subtle)' : 'var(--bg-surface)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'card'}
                  onChange={() => setSelectedMethod('card')}
                  style={{ accentColor: 'var(--brand-primary)' }}
                />
                <CreditCard size={18} color="var(--text-secondary)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    Corporate Visa ending in 4242
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Expires 09/28</div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${selectedMethod === 'bank' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                  backgroundColor: selectedMethod === 'bank' ? 'var(--brand-subtle)' : 'var(--bg-surface)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'bank'}
                  onChange={() => setSelectedMethod('bank')}
                  style={{ accentColor: 'var(--brand-primary)' }}
                />
                <Landmark size={18} color="var(--text-secondary)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    Direct NEFT/RTGS Bank Transfer
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>HDFC Corporate Account •••• 9812</div>
                </div>
              </label>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '12px'
            }}
          >
            <ShieldCheck size={16} color="#10B981" />
            <span>Encrypted via 256-bit bank grade security protocol. Instant GST receipt generated.</span>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal} disabled={isProcessing}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Payment...' : `Pay ₹${paymentAmount.toLocaleString('en-IN')}`}
          </button>
        </div>
      </div>
    </div>
  );
};
