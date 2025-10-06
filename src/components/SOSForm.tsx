import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const sosSchema = z.object({
  severity: z.enum(['RED', 'ORANGE', 'GREEN']),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  evidence: z.any().optional(),
  geoTag: z.boolean(),
  anonymous: z.boolean(),
});

type SOSFormData = z.infer<typeof sosSchema>;

interface SOSFormProps {
  onSubmit?: (data: SOSFormData & { caseId: string; sla: string }) => void;
}

export default function SOSForm({ onSubmit }: SOSFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedCaseId, setGeneratedCaseId] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SOSFormData>({
    resolver: zodResolver(sosSchema),
    defaultValues: {
      severity: 'ORANGE',
      geoTag: false,
      anonymous: false,
    },
  });

  const selectedSeverity = watch('severity');
  const geoTagEnabled = watch('geoTag');
  const anonymousEnabled = watch('anonymous');

  const severityOptions = [
    {
      value: 'RED',
      label: 'Severe',
      color: 'from-red-500 to-red-600',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-500/20',
      description: 'Immediate danger or harassment',
      sla: 'Immediate — phone call + SMS to emergency contacts',
    },
    {
      value: 'ORANGE',
      label: 'Serious',
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-500/20',
      description: 'Payment issues, contract violations',
      sla: '24h response to triage',
    },
    {
      value: 'GREEN',
      label: 'Informational',
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-500/20',
      description: 'Questions, clarifications, guidance',
      sla: '72h response',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB limit
    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const captureGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const onFormSubmit = async (data: SOSFormData) => {
    // Generate case ID
    const caseId = `PRS-SOS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const selectedOption = severityOptions.find((opt) => opt.value === data.severity);
    const sla = selectedOption?.sla || '';

    setGeneratedCaseId(caseId);
    setIsSubmitted(true);

    // Call parent onSubmit if provided
    if (onSubmit) {
      onSubmit({ ...data, caseId, sla });
    }

    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 text-center max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-green to-green-500 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Case Submitted Successfully</h2>
        
        <div className="inline-block px-6 py-3 rounded-lg bg-white/10 border border-white/20 mb-6">
          <p className="text-sm text-slate-400 mb-1">Your Case ID</p>
          <p className="text-2xl font-bold text-gradient">{generatedCaseId}</p>
        </div>

        <div className="space-y-4 text-left mb-8">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                severityOptions.find((opt) => opt.value === selectedSeverity)?.color
              } flex items-center justify-center flex-shrink-0`}>
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Response Time (SLA)</h3>
                <p className="text-sm text-slate-300">
                  {severityOptions.find((opt) => opt.value === selectedSeverity)?.sla}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-primary-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">What Happens Next?</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• You'll receive a confirmation email</li>
                  <li>• Our team will review your case</li>
                  <li>• You'll be contacted within the SLA timeframe</li>
                  <li>• Track your case status in your dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          {selectedSeverity === 'RED' && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🚨</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Emergency Response Activated</h3>
                  <p className="text-sm text-slate-300">
                    Our emergency response team has been notified. You will receive a phone call shortly.
                    If you need immediate assistance, please call our 24/7 helpline: <strong>1800-XXX-XXXX</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-primary"
        >
          Submit Another Case
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8 max-w-3xl mx-auto">
      {/* Severity Selection */}
      <div>
        <label className="block text-lg font-semibold text-white mb-4">
          Select Severity Level <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {severityOptions.map((option) => (
            <label
              key={option.value}
              className={`relative cursor-pointer`}
            >
              <input
                type="radio"
                value={option.value}
                {...register('severity')}
                className="sr-only"
              />
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedSeverity === option.value
                    ? `${option.borderColor} ${option.bgColor}`
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                  <span className="text-2xl">
                    {option.value === 'RED' ? '🚨' : option.value === 'ORANGE' ? '⚠️' : 'ℹ️'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">{option.label}</h3>
                <p className="text-sm text-slate-400 text-center mb-3">{option.description}</p>
                <div className="text-xs text-slate-500 text-center">
                  SLA: {option.sla.split('—')[0]}
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.severity && (
          <p className="mt-2 text-sm text-red-400">{errors.severity.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-lg font-semibold text-white mb-2">
          Describe the Incident <span className="text-red-400">*</span>
        </label>
        <p className="text-sm text-slate-400 mb-3">
          Provide as much detail as possible (10-500 characters)
        </p>
        <textarea
          id="description"
          {...register('description')}
          rows={6}
          className="input-field resize-none"
          placeholder="Please describe what happened, when it occurred, and any other relevant details..."
        />
        <div className="flex justify-between mt-2">
          {errors.description && (
            <p className="text-sm text-red-400">{errors.description.message}</p>
          )}
          <p className="text-sm text-slate-500 ml-auto">
            {watch('description')?.length || 0} / 500
          </p>
        </div>
      </div>

      {/* Evidence Upload */}
      <div>
        <label className="block text-lg font-semibold text-white mb-2">
          Upload Evidence <span className="text-slate-500">(Optional)</span>
        </label>
        <p className="text-sm text-slate-400 mb-3">
          Images, audio, documents, or screenshots (max 10MB per file)
        </p>
        
        <label className="block">
          <input
            type="file"
            multiple
            accept="image/*,audio/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-neon-blue/50 hover:bg-white/5 transition-all">
            <svg className="w-12 h-12 mx-auto mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-slate-300 mb-1">Click to upload or drag & drop</p>
            <p className="text-sm text-slate-500">Images, audio, PDF, DOC (max 10MB each)</p>
          </div>
        </label>

        {/* Uploaded files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                    <span className="text-xl">📎</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Geo-tag */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('geoTag')}
            className="w-5 h-5 rounded border-white/20 bg-white/5 text-neon-blue focus:ring-neon-blue/50 focus:ring-offset-slate-950"
          />
          <span className="text-base font-medium text-white">Include my location (Geo-tag)</span>
        </label>
        {geoTagEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 rounded-lg bg-white/5 border border-white/10"
          >
            {geoLocation ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Location captured:</p>
                  <p className="text-sm font-mono text-neon-blue">
                    {geoLocation.lat.toFixed(4)}° N, {geoLocation.lng.toFixed(4)}° E
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setGeoLocation(null)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={captureGeoLocation}
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-slate-300 transition-colors"
              >
                📍 Capture Current Location
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Anonymity */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('anonymous')}
            className="w-5 h-5 rounded border-white/20 bg-white/5 text-neon-blue focus:ring-neon-blue/50 focus:ring-offset-slate-950"
          />
          <span className="text-base font-medium text-white">Submit anonymously</span>
        </label>
        {anonymousEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30"
          >
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-orange-300 mb-1">Anonymous Submission Notice</p>
                <p className="text-sm text-slate-400">
                  While we'll protect your identity, complete anonymity may limit our ability to follow up or provide updates. 
                  Consider using a secure email for better support.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Case...
            </span>
          ) : (
            'Submit SOS Case'
          )}
        </button>
        <p className="text-center text-sm text-slate-500 mt-3">
          By submitting, you agree to our incident response protocols
        </p>
      </div>
    </form>
  );
}
