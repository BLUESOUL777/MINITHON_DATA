import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    BarChart3,
    MessageSquare,
    Zap,
    Shield,
    TrendingUp,
    Upload,
    FileText,
    Image,
    Database,
    X,
    CheckCircle,
    AlertCircle,
    Loader2,
} from "lucide-react";

// Mock components (replace with your actual imports)
const Button = ({ children, asChild = false, variant = 'hero', size = 'default', className = '', disabled = false, ...props }) => {
  const baseClasses = `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background`;
  
  const variantClasses = {
    hero: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-200 hover:bg-gray-100',
    ghost: 'hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  };
  
  const sizeClasses = {
    xl: 'h-12 px-8 py-3 text-lg',
    lg: 'h-11 px-6 py-2',
    default: 'h-10 py-2 px-4',
    sm: 'h-8 px-3 text-xs'
  };

  // Simplified: always render a native button to avoid cloneElement typing issues
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.hero} ${sizeClasses[size] || sizeClasses.default} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Mock images
const heroImage = "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%236b7280'%3EHero Dashboard%3C/text%3E%3C/svg%3E";
const chartsFeature = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ddd6fe'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%237c3aed'%3ECharts Feature%3C/text%3E%3C/svg%3E";
const aiChatFeature = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23dcfce7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%2316a34a'%3EAI Chat Feature%3C/text%3E%3C/svg%3E";

const features = [
    {
        name: "Interactive Data Visualization",
        description:
            "Create stunning charts and graphs with real-time data visualization capabilities. Our tools make it easy to explore, filter, and present your data in a way that's both beautiful and insightful.",
        icon: BarChart3,
        image: chartsFeature,
    },
    {
        name: "AI-Powered Chat Assistant",
        description:
            "Our advanced AI assistant is more than a chatbot. It can analyze complex datasets, answer your questions in natural language, and generate custom reports, all without a single line of code.",
        icon: MessageSquare,
        image: aiChatFeature,
    },
    {
        name: "Smart File Upload & Analysis",
        description:
            "Upload your data files (CSV, Excel, JSON, images) and get instant AI-powered insights. Our system automatically processes and analyzes your data, providing meaningful interpretations.",
        icon: Upload,
    },
    {
        name: "Lightning Fast Performance",
        description:
            "Don't wait for your data. Our platform is engineered for speed, with optimized queries and real-time updates that ensure a fluid and responsive experience across all your devices.",
        icon: Zap,
    },
    {
        name: "Enterprise Security",
        description:
            "Your data's security is our top priority. We use bank-level encryption, multi-factor authentication, and strict compliance standards to keep your information safe and secure at all times.",
        icon: Shield,
    },
    {
        name: "Advanced Analytics",
        description:
            "Go beyond the surface with advanced analytics. Our platform provides deep insights, predictive modeling, and machine learning capabilities to help you anticipate trends and make strategic decisions.",
        icon: TrendingUp,
    },
];

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return <span>{count}</span>;
};

// File Upload Component
const FileUpload = ({ onFileUpload, uploadedFiles, onRemoveFile, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      Array.from(e.dataTransfer.files).forEach(onFileUpload);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      Array.from(e.target.files).forEach(onFileUpload);
    }
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return Image;
    if (type.includes('sheet') || type.includes('csv')) return Database;
    return FileText;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleChange}
          accept=".csv,.xlsx,.xls,.json,.txt,.png,.jpg,.jpeg,.gif,.pdf"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            dragActive ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Upload className={`w-8 h-8 transition-colors ${
              dragActive ? 'text-blue-600' : 'text-gray-600'
            }`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload your data files
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports: CSV, Excel, JSON, Images, PDF (Max 10MB per file)
            </p>
          </div>
          
          <Button variant="outline" className="hover-scale">
            Browse Files
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file, index) => {
            const IconComponent = getFileIcon(file.type);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'analyzing' && (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  )}
                  {file.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFile(index)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// AI Analysis Results Component
const AnalysisResults = ({ results, isVisible }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className={`mt-8 space-y-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
      <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
        AI Analysis Results
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <Card key={index} className="card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <CardTitle className="text-lg">{result.fileName}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Summary:</h4>
                  <p className="text-sm text-gray-600">{result.summary}</p>
                </div>
                
                {result.insights && result.insights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Key Insights:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.insights.slice(0, 3).map((insight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.metrics && (
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
                    {Object.entries(result.metrics as Record<string, React.ReactNode>).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function Landing() {
  const [isVisible, setIsVisible] = useState<{ hero: boolean; upload: boolean; features: boolean; demo: boolean; cta: boolean }>({
    hero: false,
    upload: false,
    features: false,
    demo: false,
    cta: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Mock AI Analysis Function (Replace with actual DeepSeek V3 API call)
  const analyzeFile = async (file) => {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Mock analysis results based on file type
    let mockResult = {
      fileName: file.name,
      summary: "",
      insights: [],
      metrics: {}
    };

    if (file.type.includes('csv') || file.type.includes('sheet')) {
      mockResult = {
        ...mockResult,
        summary: "Dataset contains structured data with multiple columns. Found patterns in numerical data and categorical distributions.",
        insights: [
          "Strong correlation detected between variables",
          "Seasonal trends identified in time-series data",
          "Outliers present in 3% of records",
          "Missing values found in 2 columns"
        ],
        metrics: {
          rows: Math.floor(Math.random() * 10000) + 1000,
          columns: Math.floor(Math.random() * 20) + 5,
          nullValues: Math.floor(Math.random() * 500),
          dataTypes: Math.floor(Math.random() * 5) + 3
        }
      };
    } else if (file.type.startsWith('image/')) {
      mockResult = {
        ...mockResult,
        summary: "Image analysis completed. Objects and patterns detected with high confidence scores.",
        insights: [
          "Primary objects identified with 95% confidence",
          "Color distribution analysis completed",
          "Text elements detected and extracted",
          "Quality assessment: High resolution"
        ],
        metrics: {
          objects: Math.floor(Math.random() * 10) + 1,
          confidence: "94%",
          resolution: "1920x1080",
          fileFormat: file.type.split('/')[1].toUpperCase()
        }
      };
    } else {
      mockResult = {
        ...mockResult,
        summary: "Document processed successfully. Content analysis and structure extraction completed.",
        insights: [
          "Document structure analyzed",
          "Key topics and themes identified",
          "Text sentiment is predominantly neutral",
          "Readability score calculated"
        ],
        metrics: {
          pages: Math.floor(Math.random() * 50) + 1,
          words: Math.floor(Math.random() * 5000) + 1000,
          topics: Math.floor(Math.random() * 8) + 3,
          sentiment: "Neutral"
        }
      };
    }

    return mockResult;
  };

  const handleFileUpload = async (file) => {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const fileWithStatus = {
      ...file,
      status: 'analyzing'
    };

    setUploadedFiles(prev => [...prev, fileWithStatus]);
    setIsAnalyzing(true);

    try {
      // Start analysis
      const result = await analyzeFile(file);
      
      // Update file status
      setUploadedFiles(prev => 
        prev.map((f, i) => 
          f === fileWithStatus ? { ...f, status: 'completed' } : f
        )
      );
      
      // Add analysis result
      setAnalysisResults(prev => [...prev, result]);
    } catch (error) {
      console.error('Analysis failed:', error);
      setUploadedFiles(prev => 
        prev.map((f, i) => 
          f === fileWithStatus ? { ...f, status: 'error' } : f
        )
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setAnalysisResults(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-bounce-custom {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate 20s linear infinite;
        }

        .animate-gradient {
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .hover-scale {
          transition: transform 0.3s ease;
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }

        .text-gradient {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .card-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .card-hover:hover::before {
          left: 100%;
        }

        .card-hover:hover {
          transform: translateY(-8px) rotateY(5deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .stagger-animation > * {
          opacity: 0;
          transform: translateY(20px);
        }

        .stagger-animation.visible > *:nth-child(1) { animation: fadeInUp 0.6s ease-out 0.1s forwards; }
        .stagger-animation.visible > *:nth-child(2) { animation: fadeInUp 0.6s ease-out 0.2s forwards; }
        .stagger-animation.visible > *:nth-child(3) { animation: fadeInUp 0.6s ease-out 0.3s forwards; }
        .stagger-animation.visible > *:nth-child(4) { animation: fadeInUp 0.6s ease-out 0.4s forwards; }
        .stagger-animation.visible > *:nth-child(5) { animation: fadeInUp 0.6s ease-out 0.5s forwards; }
        .stagger-animation.visible > *:nth-child(6) { animation: fadeInUp 0.6s ease-out 0.6s forwards; }

        .typing-animation {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid;
          animation: typing 3s steps(40, end), blink 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: currentColor; }
        }

        .parallax {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-400 rounded-full opacity-5 animate-pulse-custom"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 text-center lg:px-8 lg:pt-32 relative z-10">
            <div className="mx-auto max-w-4xl">
              <h1 className={`text-4xl font-bold tracking-tight text-slate-900 font-serif sm:text-6xl lg:text-7xl ${isVisible.hero ? 'animate-fadeInUp' : 'opacity-0'}`}>
                Transform Your Data Into{" "}
                <span className="text-gradient relative inline-block">
                  Actionable Insights
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-bounce-custom opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500 rounded-full animate-pulse-custom opacity-40"></div>
                </span>
              </h1>
              
              <p className={`mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto ${isVisible.hero ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                Experience the next generation of data visualization and AI-powered analytics. 
                Upload your files and get instant insights powered by DeepSeek V3.
              </p>
              
              <div className={`mt-10 flex items-center justify-center gap-6 ${isVisible.hero ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <Button variant="hero" size="xl" className="hover-lift hover-glow group">
                  Get Started 
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="xl" className="hover-scale">
                  Try AI Chat
                </Button>
              </div>

              {/* Stats */}
              <div className={`mt-16 grid grid-cols-3 gap-8 ${isVisible.hero ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">
                    <AnimatedCounter target={50000} />+
                  </div>
                  <div className="text-sm text-slate-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">
                    <AnimatedCounter target={99} />%
                  </div>
                  <div className="text-sm text-slate-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">
                    <AnimatedCounter target={1000000} />+
                  </div>
                  <div className="text-sm text-slate-600">Data Points</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className={`relative mx-auto mt-16 max-w-5xl ${isVisible.hero ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
              <div className="rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 p-2 shadow-2xl relative overflow-hidden glass">
                <img
                  src={heroImage}
                  alt="DataVision AI Dashboard"
                  className="w-full rounded-xl shadow-lg hover-lift transition-transform duration-500"
                />
                {/* Floating decorative elements */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-blue-500 rounded-full animate-float opacity-60"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 bg-green-500 rounded-full animate-bounce-custom opacity-50" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-4 w-2 h-2 bg-purple-500 rounded-full animate-pulse-custom opacity-40"></div>
              </div>
            </div>
          </div>
        </section>

        {/* File Upload Section */}
        <section id="upload" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='1'%3E%3Cpath d='m20 20 20-20v40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
            <div className={`text-center mb-12 ${isVisible.upload ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif sm:text-4xl mb-4">
                Upload & Analyze Your Data Instantly
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Powered by DeepSeek V3 AI, get intelligent insights from your files in seconds. 
                Support for CSV, Excel, JSON, images, and more.
              </p>
            </div>

            <div className={`${isVisible.upload ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <FileUpload
                onFileUpload={handleFileUpload}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {/* Analysis Results */}
            <AnalysisResults 
              results={analysisResults} 
              isVisible={isVisible.upload && analysisResults.length > 0}
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
            <div className={`text-center ${isVisible.features ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif sm:text-4xl">
                Everything you need to visualize your data
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Powerful features designed to help you understand and act on your data faster than ever before.
              </p>
            </div>
            
            <div className={`mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 stagger-animation ${isVisible.features ? 'visible' : ''}`}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.name} className="card-hover group relative overflow-hidden border-0 shadow-lg">
                    <CardHeader>
                      {feature.image && (
                        <div className="mb-4 overflow-hidden rounded-lg relative">
                          <img
                            src={feature.image}
                            alt={feature.name}
                            className="h-48 w-full object-cover hover-scale transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2 group-hover:bg-blue-200 transition-colors duration-300">
                          <Icon className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
                          {feature.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed text-slate-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Demo Section */}
        <section id="demo" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
            <div className={`text-center mb-16 ${isVisible.demo ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif sm:text-4xl mb-4">
                See DeepSeek V3 AI in Action
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Watch how our AI analyzes different types of data and provides intelligent insights
              </p>
            </div>

            <div className={`grid md:grid-cols-2 gap-8 ${isVisible.demo ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              {/* Sample Analysis Cards */}
              <Card className="card-hover group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Database className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Sales Data Analysis</CardTitle>
                      <CardDescription>CSV • 15,420 rows</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      "Revenue shows 23% growth year-over-year with peak performance in Q4. 
                      Strong correlation between marketing spend and conversion rates."
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">+23%</div>
                        <div className="text-xs text-gray-500">Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">94%</div>
                        <div className="text-xs text-gray-500">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Image className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Product Image Analysis</CardTitle>
                      <CardDescription>JPG • 2.3 MB</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      "Detected: laptop, smartphone, office environment. High-quality product 
                      placement with professional lighting. Suitable for e-commerce use."
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">8</div>
                        <div className="text-xs text-gray-500">Objects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-indigo-600">97%</div>
                        <div className="text-xs text-gray-500">Confidence</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Try Demo Button */}
            <div className={`text-center mt-12 ${isVisible.demo ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <Button size="xl" className="hover-lift">
                Try Demo with Sample Data
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 animate-gradient"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8 relative z-10">
            <div className={`${isVisible.cta ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold tracking-tight text-white font-serif sm:text-4xl">
                Ready to transform your data?
              </h2>
              <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                Join thousands of businesses making better decisions
                with DataVision AI powered by DeepSeek V3.
              </p>
            </div>
            
            <div className={`mt-8 flex items-center justify-center gap-4 ${isVisible.cta ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 hover-lift">
                Start Free Trial{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600 hover-scale">
                View Demo
              </Button>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-6 h-6 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute bottom-10 right-10 w-4 h-4 bg-white/30 rounded-full animate-bounce-custom"></div>
            <div className="absolute top-1/2 right-20 w-3 h-3 bg-white/25 rounded-full animate-pulse-custom"></div>
          </div>
        </section>
      </div>
    </>
  );
}