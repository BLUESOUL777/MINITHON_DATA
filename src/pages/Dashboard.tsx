import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Download,
  RefreshCw,
  Filter,
  Upload,
  Calendar,
  FileText,
  Presentation,
  X,
  Check
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const defaultMonthlyData = [
  { name: "Jan", value: 4000, growth: 2400, users: 2400, conversionRate: 3.2, avgSession: 4.32, desktopUsers: 1080, mobileUsers: 1200, tabletUsers: 120 },
  { name: "Feb", value: 3000, growth: 1398, users: 1398, conversionRate: 3.4, avgSession: 4.45, desktopUsers: 1116, mobileUsers: 1240, tabletUsers: 124 },
  { name: "Mar", value: 2000, growth: 9800, users: 9800, conversionRate: 3.6, avgSession: 4.58, desktopUsers: 1179, mobileUsers: 1310, tabletUsers: 131 },
  { name: "Apr", value: 2780, growth: 3908, users: 3908, conversionRate: 3.8, avgSession: 4.72, desktopUsers: 1238, mobileUsers: 1375, tabletUsers: 137 },
  { name: "May", value: 1890, growth: 4800, users: 4800, conversionRate: 4.0, avgSession: 4.85, desktopUsers: 1301, mobileUsers: 1445, tabletUsers: 144 },
  { name: "Jun", value: 2390, growth: 3800, users: 3800, conversionRate: 4.2, avgSession: 4.98, desktopUsers: 1359, mobileUsers: 1510, tabletUsers: 151 },
  { name: "Jul", value: 3490, growth: 4300, users: 4300, conversionRate: 4.4, avgSession: 5.12, desktopUsers: 1418, mobileUsers: 1575, tabletUsers: 157 },
];

const defaultPieData = [
  { name: "Desktop", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 20, color: "hsl(var(--chart-3))" },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-2.4%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "+8.1%",
    changeType: "positive" as const,
    icon: Activity,
  },
];

// CSV parsing utility function
const parseCSV = (csvText: string) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      const numValue = parseFloat(value);
      row[header.toLowerCase()] = isNaN(numValue) ? value : numValue;
    });
    
    data.push(row);
  }
  
  return data;
};

// Transform CSV data to chart format
const transformDataForCharts = (csvData: any[]) => {
  return csvData.map((row, index) => ({
    name: row.month || row.name || `Month ${index + 1}`,
    value: row['total revenue'] || row.revenue || row.value || 0,
    growth: row['growth rate'] || row.growth || 0,
    users: row['active users'] || row.users || 0,
    conversionRate: row['conversion rate'] || row['conversion_rate'] || 0,
    avgSession: row['avg session'] || row['avg_session'] || 0,
    desktopUsers: row['desktop users'] || row['desktop_users'] || 0,
    mobileUsers: row['mobile users'] || row['mobile_users'] || 0,
    tabletUsers: row['tablet users'] || row['tablet_users'] || 0,
  }));
};

export default function Dashboard() {
  const [monthlyData, setMonthlyData] = useState(defaultMonthlyData);
  const [pieData, setPieData] = useState(defaultPieData);
  const [statsData, setStatsData] = useState(stats);
  const [isDataUploaded, setIsDataUploaded] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<'all' | 'range' | 'custom'>('all');
  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'ppt' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const parsedData = parseCSV(csvText);
        const transformedData = transformDataForCharts(parsedData);
        
        setMonthlyData(transformedData);
        setIsDataUploaded(true);
        // Reset filters when new data is uploaded
        setFilterMode('all');
        setSelectedMonths([]);
        setStartMonth('');
        setEndMonth('');
      } catch (error) {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const handleRefresh = () => {
    setMonthlyData(defaultMonthlyData);
    setPieData(defaultPieData);
    setStatsData(stats);
    setIsDataUploaded(false);
    setFilterMode('all');
    setSelectedMonths([]);
    setStartMonth('');
    setEndMonth('');
    setShowFilterPanel(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get available months for filter dropdown
  const getAvailableMonths = () => {
    return monthlyData.map(item => item.name);
  };

  // Apply filters to get filtered data
  const getFilteredData = () => {
    if (filterMode === 'all') {
      return monthlyData;
    } else if (filterMode === 'range' && startMonth && endMonth) {
      const startIndex = monthlyData.findIndex(m => m.name === startMonth);
      const endIndex = monthlyData.findIndex(m => m.name === endMonth);
      if (startIndex !== -1 && endIndex !== -1) {
        return monthlyData.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1);
      }
    } else if (filterMode === 'custom' && selectedMonths.length > 0) {
      return monthlyData.filter(m => selectedMonths.includes(m.name));
    }
    return monthlyData;
  };

  // Update stats based on filtered data
  const updateStats = () => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return;

    const totalRevenue = filteredData.reduce((sum, month) => sum + (month.value || 0), 0);
    const totalUsers = filteredData.reduce((sum, month) => sum + (month.users || 0), 0);
    const avgConversionRate = filteredData.reduce((sum, month) => sum + (month.conversionRate || 0), 0) / filteredData.length;
    const avgSession = filteredData.reduce((sum, month) => sum + (month.avgSession || 0), 0) / filteredData.length;
    
    const firstMonth = filteredData[0];
    const lastMonth = filteredData[filteredData.length - 1];
    const revenueGrowth = firstMonth.value ? ((lastMonth.value - firstMonth.value) / firstMonth.value * 100) : 0;
    const userGrowth = firstMonth.users ? ((lastMonth.users - firstMonth.users) / firstMonth.users * 100) : 0;
    
    setStatsData([
      {
        title: "Total Revenue",
        value: `$${totalRevenue.toLocaleString()}`,
        change: revenueGrowth >= 0 ? `+${revenueGrowth.toFixed(1)}%` : `${revenueGrowth.toFixed(1)}%`,
        changeType: revenueGrowth >= 0 ? "positive" : "negative",
        icon: DollarSign,
      },
      {
        title: "Active Users",
        value: totalUsers.toLocaleString(),
        change: userGrowth >= 0 ? `+${userGrowth.toFixed(1)}%` : `${userGrowth.toFixed(1)}%`,
        changeType: userGrowth >= 0 ? "positive" : "negative",
        icon: Users,
      },
      {
        title: "Conversion Rate",
        value: `${avgConversionRate.toFixed(1)}%`,
        change: "Average",
        changeType: "positive",
        icon: TrendingUp,
      },
      {
        title: "Avg. Session",
        value: `${Math.floor(avgSession)}m ${Math.round((avgSession % 1) * 60)}s`,
        change: "Average",
        changeType: "positive",
        icon: Activity,
      },
    ]);
  };

  // Update pie chart data based on filtered data
  const updatePieData = () => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return;

    const totalDesktopUsers = filteredData.reduce((sum, month) => sum + (month.desktopUsers || 0), 0);
    const totalMobileUsers = filteredData.reduce((sum, month) => sum + (month.mobileUsers || 0), 0);
    const totalTabletUsers = filteredData.reduce((sum, month) => sum + (month.tabletUsers || 0), 0);
    const totalDeviceUsers = totalDesktopUsers + totalMobileUsers + totalTabletUsers;
    
    if (totalDeviceUsers > 0) {
      setPieData([
        { 
          name: "Desktop", 
          value: Math.round((totalDesktopUsers / totalDeviceUsers) * 100), 
          color: "hsl(var(--chart-1))" 
        },
        { 
          name: "Mobile", 
          value: Math.round((totalMobileUsers / totalDeviceUsers) * 100), 
          color: "hsl(var(--chart-2))" 
        },
        { 
          name: "Tablet", 
          value: Math.round((totalTabletUsers / totalDeviceUsers) * 100), 
          color: "hsl(var(--chart-3))" 
        },
      ]);
    }
  };

  // Handle month selection for custom filter
  const toggleMonthSelection = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  // Apply filters
  const applyFilters = () => {
    updateStats();
    updatePieData();
    setShowFilterPanel(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilterMode('all');
    setSelectedMonths([]);
    setStartMonth('');
    setEndMonth('');
    updateStats();
    updatePieData();
  };

  // Get filtered data for charts
  const filteredData = getFilteredData();

  // Update stats and pie data when filters change
  useEffect(() => {
    updateStats();
    updatePieData();
  }, [monthlyData, filterMode, selectedMonths, startMonth, endMonth]);

  // Export to PDF function
  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportFormat('pdf');
    
    try {
      // Create a dynamic script element to load jsPDF
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      document.head.appendChild(script);
      
      await new Promise((resolve) => {
        script.onload = resolve;
      });
      
      // @ts-ignore
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Design variables
      const primaryColor = [59, 130, 246]; // Blue
      const textDark = [51, 51, 51];
      const textLight = [102, 102, 102];
      
      // Helper functions
      const addHeader = (text: string, y: number, size: number = 20) => {
        pdf.setFontSize(size);
        pdf.setTextColor(...primaryColor);
        pdf.text(text, pageWidth / 2, y, { align: 'center' });
      };
      
      const addSection = (title: string, y: number) => {
        pdf.setFontSize(14);
        pdf.setTextColor(...textDark);
        pdf.text(title, 20, y);
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, y + 2, pageWidth - 20, y + 2);
        return y + 10;
      };
      
      const addMetric = (label: string, value: string, x: number, y: number) => {
        pdf.setFontSize(10);
        pdf.setTextColor(...textLight);
        pdf.text(label, x, y);
        pdf.setFontSize(12);
        pdf.setTextColor(...textDark);
        pdf.text(value, x, y + 5);
      };
      
      // Page 1: Cover & Summary
      pdf.setFillColor(...primaryColor);
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text('Analytics Dashboard Report', pageWidth / 2, 20, { align: 'center' });
      pdf.setFontSize(12);
      pdf.text(new Date().toLocaleDateString(), pageWidth / 2, 30, { align: 'center' });
      
      // Executive Summary
      let yPos = addSection('Executive Summary', 60);
      
      const summaryData = getFilteredData();
      const totalRevenue = summaryData.reduce((sum, m) => sum + m.value, 0);
      const totalUsers = summaryData.reduce((sum, m) => sum + m.users, 0);
      const avgConversion = summaryData.reduce((sum, m) => sum + m.conversionRate, 0) / summaryData.length;
      
      addMetric('Total Revenue', `$${totalRevenue.toLocaleString()}`, 30, yPos);
      addMetric('Total Users', totalUsers.toLocaleString(), 80, yPos);
      addMetric('Avg Conversion', `${avgConversion.toFixed(1)}%`, 130, yPos);
      
      yPos += 25;
      
      // Filter Information
      yPos = addSection('Analysis Period', yPos);
      pdf.setFontSize(10);
      pdf.setTextColor(...textDark);
      
      if (filterMode === 'all') {
        pdf.text('All available data', 30, yPos);
      } else if (filterMode === 'range') {
        pdf.text(`Date Range: ${startMonth} to ${endMonth}`, 30, yPos);
      } else if (filterMode === 'custom') {
        pdf.text(`Selected Months: ${selectedMonths.join(', ')}`, 30, yPos);
      }
      
      yPos += 15;
      
      // Monthly Data Table
      yPos = addSection('Monthly Performance Data', yPos);
      
      // Table headers
      const headers = ['Month', 'Revenue', 'Users', 'Conv. Rate', 'Avg Session'];
      const colWidths = [30, 35, 30, 30, 35];
      let xPos = 20;
      
      pdf.setFillColor(248, 250, 252);
      pdf.rect(20, yPos - 5, pageWidth - 40, 10, 'F');
      
      pdf.setFontSize(10);
      pdf.setTextColor(...textDark);
      headers.forEach((header, i) => {
        pdf.text(header, xPos + 2, yPos);
        xPos += colWidths[i];
      });
      
      yPos += 10;
      
      // Table data
      filteredData.forEach((row, index) => {
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = 20;
        }
        
        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(20, yPos - 5, pageWidth - 40, 8, 'F');
        }
        
        xPos = 20;
        const rowData = [
          row.name,
          `$${row.value.toLocaleString()}`,
          row.users.toLocaleString(),
          `${row.conversionRate.toFixed(1)}%`,
          `${Math.floor(row.avgSession)}m ${Math.round((row.avgSession % 1) * 60)}s`
        ];
        
        pdf.setFontSize(9);
        pdf.setTextColor(...textDark);
        rowData.forEach((data, i) => {
          pdf.text(data, xPos + 2, yPos);
          xPos += colWidths[i];
        });
        
        yPos += 8;
      });
      
      // Page 2: Insights
      pdf.addPage();
      
      addHeader('Key Insights & Recommendations', 30, 18);
      
      yPos = 50;
      
      // Growth Analysis
      yPos = addSection('Growth Analysis', yPos);
      
      const firstMonth = filteredData[0];
      const lastMonth = filteredData[filteredData.length - 1];
      const revenueGrowth = ((lastMonth.value - firstMonth.value) / firstMonth.value * 100).toFixed(1);
      const userGrowth = ((lastMonth.users - firstMonth.users) / firstMonth.users * 100).toFixed(1);
      
      pdf.setFontSize(10);
      pdf.setTextColor(...textDark);
      pdf.text(`• Revenue Growth: ${revenueGrowth}%`, 30, yPos);
      pdf.text(`• User Growth: ${userGrowth}%`, 30, yPos + 7);
      pdf.text(`• Peak Revenue Month: ${filteredData.reduce((max, m) => m.value > max.value ? m : max).name}`, 30, yPos + 14);
      pdf.text(`• Peak Users Month: ${filteredData.reduce((max, m) => m.users > max.users ? m : max).name}`, 30, yPos + 21);
      
      yPos += 35;
      
      // Device Distribution
      yPos = addSection('Device Distribution', yPos);
      
      const totalDesktop = filteredData.reduce((sum, m) => sum + m.desktopUsers, 0);
      const totalMobile = filteredData.reduce((sum, m) => sum + m.mobileUsers, 0);
      const totalTablet = filteredData.reduce((sum, m) => sum + m.tabletUsers, 0);
      const totalDevices = totalDesktop + totalMobile + totalTablet;
      
      pdf.text(`• Desktop: ${Math.round(totalDesktop / totalDevices * 100)}%`, 30, yPos);
      pdf.text(`• Mobile: ${Math.round(totalMobile / totalDevices * 100)}%`, 30, yPos + 7);
      pdf.text(`• Tablet: ${Math.round(totalTablet / totalDevices * 100)}%`, 30, yPos + 14);
      
      yPos += 30;
      
      // Recommendations
      yPos = addSection('Strategic Recommendations', yPos);
      
      const recommendations = [];
      if (parseFloat(revenueGrowth) > 10) {
        recommendations.push('Continue current growth strategies and consider scaling operations');
      } else if (parseFloat(revenueGrowth) < 0) {
        recommendations.push('Review pricing strategy and customer retention programs');
      }
      
      if (parseFloat(userGrowth) > 15) {
        recommendations.push('Focus on user retention to maintain growth momentum');
      } else {
        recommendations.push('Invest in user acquisition and marketing campaigns');
      }
      
      if (avgConversion > 4) {
        recommendations.push('Maintain excellent conversion rates through continuous UX optimization');
      } else {
        recommendations.push('Conduct user research to improve conversion funnel');
      }
      
      recommendations.forEach((rec, i) => {
        pdf.text(`${i + 1}. ${rec}`, 30, yPos + (i * 7));
      });
      
      // Save PDF
      pdf.save(`analytics-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };

  // Export to PowerPoint function
  const handleExportPPT = async () => {
    setIsExporting(true);
    setExportFormat('ppt');
    
    try {
      // Check if PptxGenJS is already loaded
      // @ts-ignore
      if (typeof window.PptxGenJS === 'undefined') {
        // Create a dynamic script element to load PptxGenJS
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('PptxGenJS loaded successfully');
            resolve(true);
          };
          script.onerror = (error) => {
            console.error('Failed to load PptxGenJS:', error);
            reject(new Error('Failed to load PowerPoint library'));
          };
          
          // Timeout after 10 seconds
          setTimeout(() => {
            reject(new Error('Timeout loading PowerPoint library'));
          }, 10000);
        });
      }
      
      // @ts-ignore
      const PptxGenJS = window.PptxGenJS;
      if (!PptxGenJS) {
        throw new Error('PowerPoint library not available');
      }
      
      const pptx = new PptxGenJS();
      
      // Set presentation properties
      pptx.author = 'Analytics Dashboard';
      pptx.company = 'Analytics Platform';
      pptx.subject = 'Analytics Report';
      pptx.title = 'Dashboard Analytics Report';
      
      // Define master slide with improved styling
      pptx.defineSlideMaster({
        title: 'MASTER_SLIDE',
        background: { color: 'FFFFFF' },
        objects: [
          { 
            rect: { 
              x: 0, y: 0, w: '100%', h: 0.75, 
              fill: {
                type: 'solid',
                color: '3B82F6'
              }
            }
          },
          { 
            text: {
              text: 'Analytics Dashboard Report',
              options: { 
                x: 0.5, y: 0.15, w: 9, h: 0.45, 
                fontSize: 18, color: 'FFFFFF', bold: true,
                align: 'center'
              }
            }
          }
        ]
      });
      
      // Get filtered data for the presentation
      const summaryData = getFilteredData();
      if (summaryData.length === 0) {
        throw new Error('No data available for export');
      }
      
      // Slide 1: Title Slide
      let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
      
      slide.addText('Analytics Dashboard Report', {
        x: 0.5, y: 1.5, w: 9, h: 1,
        fontSize: 36, bold: true, color: '1F2937',
        align: 'center'
      });
      
      slide.addText(`Generated on ${new Date().toLocaleDateString()}`, {
        x: 0.5, y: 2.8, w: 9, h: 0.5,
        fontSize: 14, color: '6B7280',
        align: 'center'
      });
      
      const periodText = filterMode === 'all' 
        ? 'All Available Data' 
        : filterMode === 'range' 
          ? `${startMonth || 'Start'} - ${endMonth || 'End'}` 
          : `Selected Months: ${selectedMonths.join(', ')}`;
      
      slide.addText(`Analysis Period: ${periodText}`, {
        x: 0.5, y: 3.5, w: 9, h: 0.5,
        fontSize: 12, color: '9CA3AF',
        align: 'center'
      });
      
      // Slide 2: Executive Summary with enhanced metrics
      slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
      
      slide.addText('Executive Summary', {
        x: 0.5, y: 1, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: '1F2937'
      });
      
      const totalRevenue = summaryData.reduce((sum, m) => sum + (m.value || 0), 0);
      const totalUsers = summaryData.reduce((sum, m) => sum + (m.users || 0), 0);
      const avgConversion = summaryData.length > 0 
        ? summaryData.reduce((sum, m) => sum + (m.conversionRate || 0), 0) / summaryData.length 
        : 0;
      const avgSession = summaryData.length > 0
        ? summaryData.reduce((sum, m) => sum + (m.avgSession || 0), 0) / summaryData.length
        : 0;
      
      // Create enhanced summary cards
      const summaryCards = [
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: '3B82F6', bgColor: 'EBF8FF' },
        { title: 'Total Users', value: totalUsers.toLocaleString(), color: '059669', bgColor: 'ECFDF5' },
        { title: 'Avg Conversion', value: `${avgConversion.toFixed(1)}%`, color: 'D97706', bgColor: 'FFFBEB' },
        { title: 'Avg Session', value: `${Math.floor(avgSession)}m ${Math.round((avgSession % 1) * 60)}s`, color: '7C3AED', bgColor: 'F3E8FF' }
      ];
      
      summaryCards.forEach((card, i) => {
        const x = 0.75 + (i % 2) * 4.25;
        const y = 2.2 + Math.floor(i / 2) * 1.8;
        
        // Enhanced card background with shadow effect
        slide.addShape(pptx.ShapeType.rect, {
          x: x, y: y, w: 3.8, h: 1.4,
          fill: { color: card.bgColor },
          line: { color: 'E5E7EB', width: 1 },
          shadow: {
            type: 'outer',
            blur: 3,
            offset: 2,
            angle: 45,
            color: '00000015'
          }
        });
        
        // Card title
        slide.addText(card.title, {
          x: x + 0.2, y: y + 0.25, w: 3.4, h: 0.4,
          fontSize: 13, color: '4B5563', bold: true
        });
        
        // Card value
        slide.addText(card.value, {
          x: x + 0.2, y: y + 0.7, w: 3.4, h: 0.5,
          fontSize: 22, bold: true, color: card.color
        });
      });
      
      // Slide 3: Data Table with improved formatting
      slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
      
      slide.addText('Monthly Performance Data', {
        x: 0.5, y: 1, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: '1F2937'
      });
      
      // Create table with proper structure
      const tableRows = [];
      
      // Header row
      tableRows.push([
        { text: 'Month', options: { bold: true, fill: '3B82F6', color: 'FFFFFF', align: 'center' } },
        { text: 'Revenue', options: { bold: true, fill: '3B82F6', color: 'FFFFFF', align: 'center' } },
        { text: 'Users', options: { bold: true, fill: '3B82F6', color: 'FFFFFF', align: 'center' } },
        { text: 'Conv. Rate', options: { bold: true, fill: '3B82F6', color: 'FFFFFF', align: 'center' } },
        { text: 'Avg Session', options: { bold: true, fill: '3B82F6', color: 'FFFFFF', align: 'center' } }
      ]);
      
      // Data rows with alternating colors
      summaryData.forEach((row, index) => {
        const bgColor = index % 2 === 0 ? 'F8FAFC' : 'FFFFFF';
        tableRows.push([
          { text: row.name || '', options: { fill: bgColor, align: 'center' } },
          { text: `$${(row.value || 0).toLocaleString()}`, options: { fill: bgColor, align: 'right' } },
          { text: (row.users || 0).toLocaleString(), options: { fill: bgColor, align: 'right' } },
          { text: `${(row.conversionRate || 0).toFixed(1)}%`, options: { fill: bgColor, align: 'center' } },
          { text: `${Math.floor(row.avgSession || 0)}m`, options: { fill: bgColor, align: 'center' } }
        ]);
      });
      
      slide.addTable(tableRows, {
        x: 0.5, y: 2, w: 9, h: 4.5,
        fontSize: 11,
        border: { type: 'solid', color: 'CBD5E1', pt: 1 },
        margin: 0.1,
        colW: [1.5, 2, 1.8, 1.8, 1.9]
      });
      
      // Slide 4: Growth Analysis with visual elements
      slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
      
      slide.addText('Growth Analysis & Key Metrics', {
        x: 0.5, y: 1, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: '1F2937'
      });
      
      if (summaryData.length >= 2) {
        const firstMonth = summaryData[0];
        const lastMonth = summaryData[summaryData.length - 1];
        const revenueGrowth = firstMonth.value 
          ? ((lastMonth.value - firstMonth.value) / firstMonth.value * 100) 
          : 0;
        const userGrowth = firstMonth.users 
          ? ((lastMonth.users - firstMonth.users) / firstMonth.users * 100) 
          : 0;
        
        const growthMetrics = [
          { 
            label: 'Revenue Growth', 
            value: `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}%`, 
            positive: revenueGrowth >= 0,
            icon: revenueGrowth >= 0 ? '↗' : '↘'
          },
          { 
            label: 'User Growth', 
            value: `${userGrowth >= 0 ? '+' : ''}${userGrowth.toFixed(1)}%`, 
            positive: userGrowth >= 0,
            icon: userGrowth >= 0 ? '↗' : '↘'
          },
          { 
            label: 'Analysis Period', 
            value: `${firstMonth.name} - ${lastMonth.name}`, 
            positive: true,
            icon: '📊'
          },
          { 
            label: 'Data Points', 
            value: `${summaryData.length} months`, 
            positive: true,
            icon: '📈'
          }
        ];
        
        growthMetrics.forEach((metric, i) => {
          const y = 2.2 + i * 0.9;
          const bgColor = metric.positive ? 'ECFDF5' : 'FEF2F2';
          const textColor = metric.positive ? '059669' : 'DC2626';
          
          // Metric background
          slide.addShape(pptx.ShapeType.rect, {
            x: 1, y: y - 0.1, w: 8, h: 0.7,
            fill: { color: bgColor },
            line: { color: 'E5E7EB', width: 1 }
          });
          
          // Icon
          slide.addText(metric.icon, {
            x: 1.3, y: y, w: 0.5, h: 0.5,
            fontSize: 16
          });
          
          // Label
          slide.addText(metric.label, {
            x: 2, y: y, w: 3, h: 0.5,
            fontSize: 16, color: '374151', bold: true
          });
          
          // Value
          slide.addText(metric.value, {
            x: 5.5, y: y, w: 3, h: 0.5,
            fontSize: 16, bold: true, color: textColor,
            align: 'right'
          });
        });
      }
      
      // Slide 5: Insights and Recommendations
      slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
      
      slide.addText('Key Insights & Strategic Recommendations', {
        x: 0.5, y: 1, w: 9, h: 0.6,
        fontSize: 26, bold: true, color: '1F2937'
      });
      
      // Generate dynamic insights based on data
      const insights = [];
      const recommendations = [];
      
      if (summaryData.length >= 2) {
        const firstMonth = summaryData[0];
        const lastMonth = summaryData[summaryData.length - 1];
        const revenueGrowth = firstMonth.value 
          ? ((lastMonth.value - firstMonth.value) / firstMonth.value * 100) 
          : 0;
        const userGrowth = firstMonth.users 
          ? ((lastMonth.users - firstMonth.users) / firstMonth.users * 100) 
          : 0;
        
        // Revenue insights
        if (revenueGrowth > 10) {
          insights.push('Strong revenue growth demonstrates healthy business expansion');
          recommendations.push('Maintain current growth strategies and explore scaling opportunities');
        } else if (revenueGrowth < -5) {
          insights.push('Revenue decline indicates immediate attention required');
          recommendations.push('Review pricing strategy and implement retention programs');
        } else {
          insights.push('Revenue showing stable performance with room for optimization');
          recommendations.push('Focus on conversion improvements and customer value enhancement');
        }
        
        // User growth insights
        if (userGrowth > 15) {
          insights.push('Exceptional user acquisition performance');
          recommendations.push('Prioritize user retention to maximize lifetime value');
        } else if (userGrowth < 0) {
          insights.push('User base showing decline - immediate action needed');
          recommendations.push('Invest in marketing channels and user experience improvements');
        }
        
        // Conversion insights
        if (avgConversion > 4) {
          insights.push('High conversion rates indicate effective user experience');
          recommendations.push('Continue A/B testing and optimization efforts');
        } else {
          insights.push('Conversion rates have significant improvement potential');
          recommendations.push('Conduct user research and optimize conversion funnel');
        }
      }
      
      // Add insights section
      slide.addText('📊 Key Insights', {
        x: 0.5, y: 2, w: 4, h: 0.5,
        fontSize: 18, bold: true, color: '3B82F6'
      });
      
      insights.slice(0, 3).forEach((insight, i) => {
        slide.addText(`• ${insight}`, {
          x: 0.7, y: 2.6 + i * 0.6, w: 4, h: 0.5,
          fontSize: 12, color: '4B5563'
        });
      });
      
      // Add recommendations section
      slide.addText('🎯 Recommendations', {
        x: 5, y: 2, w: 4, h: 0.5,
        fontSize: 18, bold: true, color: '059669'
      });
      
      recommendations.slice(0, 3).forEach((rec, i) => {
        slide.addText(`• ${rec}`, {
          x: 5.2, y: 2.6 + i * 0.6, w: 4, h: 0.5,
          fontSize: 12, color: '4B5563'
        });
      });
      
      // Save presentation with error handling
      const fileName = `analytics-report-${new Date().toISOString().split('T')[0]}.pptx`;
      
      await pptx.writeFile({ fileName });
      
      // Show success message
      console.log('PowerPoint presentation generated successfully');
      
    } catch (error) {
      console.error('Error generating PowerPoint:', error);
      
      let errorMessage = 'Failed to generate PowerPoint presentation.';
      if (error instanceof Error) {
        if (error.message.includes('library')) {
          errorMessage = 'Failed to load PowerPoint library. Please check your internet connection.';
        } else if (error.message.includes('No data')) {
          errorMessage = 'No data available for export. Please ensure you have data to export.';
        } else {
          errorMessage = `Export failed: ${error.message}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-800/30 dark:to-indigo-900/40">
      {/* Enhanced Header */}
      <div className="dashboard-header sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg font-medium">
                Monitor your key metrics and performance indicators
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="btn-glass hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800 transition-smooth hover:shadow-md"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`btn-glass border-purple-200 text-purple-700 hover:text-purple-800 transition-smooth hover:shadow-md ${
                  showFilterPanel ? 'bg-purple-50 border-purple-300' : 'hover:bg-purple-50'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {filterMode !== 'all' && (
                  <span className="ml-1 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {filterMode === 'custom' ? selectedMonths.length : 'Range'}
                  </span>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="btn-glass hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-800 transition-smooth hover:shadow-md"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="gradient-primary hover:shadow-lg transition-smooth disabled:opacity-50"
                >
                  {isExporting && exportFormat === 'pdf' ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </>
                  )}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleExportPPT}
                  disabled={isExporting}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-md hover:shadow-lg transition-smooth disabled:opacity-50"
                >
                  {isExporting && exportFormat === 'ppt' ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Presentation className="h-4 w-4 mr-2" />
                      Export PPT
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="glass-panel border-b border-border/60 shadow-lg animate-slide-up">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-foreground">Filter Options</h3>
                  <p className="text-sm text-muted-foreground">Customize your data view with advanced filtering</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilterPanel(false)}
                  className="hover:bg-muted transition-smooth"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Filter Mode Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:bg-slate-50 ${
                    filterMode === 'all' ? 'border-blue-300 bg-blue-50' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="filterMode"
                      checked={filterMode === 'all'}
                      onChange={() => setFilterMode('all')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-slate-900">All Data</span>
                      <p className="text-sm text-slate-600 mt-1">Show all available months</p>
                    </div>
                  </Label>
                </div>
                
                <div className="space-y-3">
                  <Label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:bg-slate-50 ${
                    filterMode === 'range' ? 'border-purple-300 bg-purple-50' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="filterMode"
                      checked={filterMode === 'range'}
                      onChange={() => setFilterMode('range')}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-slate-900">Date Range</span>
                      <p className="text-sm text-slate-600 mt-1">Select start and end months</p>
                    </div>
                  </Label>
                  {filterMode === 'range' && (
                    <div className="flex gap-3 pl-7">
                      <Select value={startMonth} onValueChange={setStartMonth}>
                        <SelectTrigger className="w-[140px] h-9 bg-white border-slate-300 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableMonths().map(month => (
                            <SelectItem key={month} value={month}>{month}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-slate-500 self-center font-medium">to</span>
                      <Select value={endMonth} onValueChange={setEndMonth}>
                        <SelectTrigger className="w-[140px] h-9 bg-white border-slate-300 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="End" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableMonths().map(month => (
                            <SelectItem key={month} value={month}>{month}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:bg-slate-50 ${
                    filterMode === 'custom' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="filterMode"
                      checked={filterMode === 'custom'}
                      onChange={() => setFilterMode('custom')}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-slate-900">Custom Selection</span>
                      <p className="text-sm text-slate-600 mt-1">Choose specific months</p>
                    </div>
                  </Label>
                  {filterMode === 'custom' && (
                    <div className="flex flex-wrap gap-2 pl-7">
                      {getAvailableMonths().map(month => (
                        <Label
                          key={month}
                          className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                            selectedMonths.includes(month)
                              ? 'border-emerald-300 bg-emerald-100 text-emerald-800'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <Checkbox
                            checked={selectedMonths.includes(month)}
                            onCheckedChange={() => toggleMonthSelection(month)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm font-medium">{month}</span>
                        </Label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Apply/Clear Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="bg-white hover:bg-slate-50 border-slate-300 text-slate-700"
                >
                  Clear Filters
                </Button>
                <Button
                  size="sm"
                  onClick={applyFilters}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={`${stat.title}-${index}`} className="dashboard-card hover-lift group">
                <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-transparent pointer-events-none" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
                  <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-smooth">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2.5 rounded-xl transition-smooth ${
                    stat.changeType === 'positive' 
                      ? 'bg-success/10 text-success group-hover:bg-success/20' 
                      : 'bg-destructive/10 text-destructive group-hover:bg-destructive/20'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className={`flex items-center gap-1.5 text-sm font-medium ${
                    stat.changeType === 'positive' ? 'status-positive' : 'status-negative'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    <span>{stat.change}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl p-1 shadow-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-600 font-medium transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-600 font-medium transition-all duration-200"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-600 font-medium transition-all duration-200"
            >
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="devices" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-600 font-medium transition-all duration-200"
            >
              Devices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-bold text-slate-900">Revenue Overview</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">
                    Monthly revenue growth ({filteredData.length} months shown)
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={filteredData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#64748B" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#64748B" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                          formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3B82F6" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorRevenue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-bold text-slate-900">Device Usage</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">User distribution by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={130}
                          paddingAngle={6}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                          formatter={(value: any) => [`${value}%`, 'Usage']}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6 mt-6">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-bold text-slate-900">Revenue Analytics</CardTitle>
                <CardDescription className="text-slate-600 font-medium">
                  Detailed revenue breakdown ({filteredData.length} months shown)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#64748B" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        yAxisId="left" 
                        stroke="#64748B" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        stroke="#64748B" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="value" 
                        fill="#3B82F6" 
                        name="Revenue ($)" 
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar 
                        yAxisId="right" 
                        dataKey="growth" 
                        fill="#10B981" 
                        name="Growth (%)" 
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-bold text-slate-900">User Growth</CardTitle>
                <CardDescription className="text-slate-600 font-medium">
                  User acquisition trends ({filteredData.length} months shown)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#64748B" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#64748B" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        stroke="#64748B" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#8B5CF6" 
                        strokeWidth={4}
                        dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#8B5CF6", strokeWidth: 2, fill: "white" }}
                        name="Active Users"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="conversionRate" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        strokeDasharray="8 4"
                        dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#F59E0B", strokeWidth: 2, fill: "white" }}
                        name="Conversion Rate (%)"
                        yAxisId="right"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-bold text-slate-900">Device Distribution</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">Current period breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                          stroke="white"
                          strokeWidth={2}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                          formatter={(value: any) => [`${value}%`, 'Usage']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-bold text-slate-900">Device Trends</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">Monthly device usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#64748B" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#64748B" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="desktopUsers" 
                          stackId="1"
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          fillOpacity={0.8}
                          name="Desktop"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="mobileUsers" 
                          stackId="1"
                          stroke="#10B981" 
                          fill="#10B981" 
                          fillOpacity={0.8}
                          name="Mobile"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="tabletUsers" 
                          stackId="1"
                          stroke="#F59E0B" 
                          fill="#F59E0B" 
                          fillOpacity={0.8}
                          name="Tablet"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Status Bar */}
        {(filterMode !== 'all' || isDataUploaded) && (
          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/60 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    {filterMode === 'all' ? 'Showing all data' : 
                     filterMode === 'range' ? `Showing ${startMonth || 'Start'} to ${endMonth || 'End'}` :
                     `Showing ${selectedMonths.length} selected months`}
                    {isDataUploaded && ' (Custom data uploaded)'}
                  </p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    Data points: {filteredData.length} months
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-100/70 transition-colors duration-200"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}