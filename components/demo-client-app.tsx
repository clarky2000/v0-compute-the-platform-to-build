"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Calculator, SlidersHorizontal, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const keypad = [
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  ".",
  "0",
  "⌫",
] as const;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function DemoClientApp() {
  const [projectCostInput, setProjectCostInput] = useState("25000");
  const [downPayment, setDownPayment] = useState([20]);
  const [interestRate, setInterestRate] = useState([6.2]);
  const [termYears, setTermYears] = useState([5]);
  const [visitors, setVisitors] = useState([2400]);
  const [conversionRate, setConversionRate] = useState([4.2]);
  const [avgOrder, setAvgOrder] = useState([220]);
  const [theme, setTheme] = useState("modern");

  const [aiChat, setAiChat] = useState(true);
  const [crmSync, setCrmSync] = useState(true);
  const [advancedAnalytics, setAdvancedAnalytics] = useState(false);

  const projectCost = Number.parseFloat(projectCostInput) || 0;
  const financedAmount = projectCost * (1 - downPayment[0] / 100);
  const monthlyRate = interestRate[0] / 100 / 12;
  const totalMonths = termYears[0] * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? financedAmount / totalMonths
      : (financedAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalMonths));

  const featureCost =
    (aiChat ? 4000 : 0) + (crmSync ? 2500 : 0) + (advancedAnalytics ? 6000 : 0);

  const totalInvestment = projectCost + featureCost;

  const monthlyRevenue = visitors[0] * (conversionRate[0] / 100) * avgOrder[0];
  const monthlyGrowth = theme === "modern" ? 0.05 : theme === "minimal" ? 0.035 : 0.06;

  const forecastData = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const growthRevenue = monthlyRevenue * Math.pow(1 + monthlyGrowth, i);
        const netCashflow = growthRevenue - monthlyPayment;

        return {
          month: `M${month}`,
          revenue: Math.round(growthRevenue),
          payment: Math.round(monthlyPayment),
          net: Math.round(netCashflow),
        };
      }),
    [monthlyRevenue, monthlyGrowth, monthlyPayment],
  );

  const channelData = useMemo(() => {
    const base = [
      { channel: "Ads", leads: 180 },
      { channel: "SEO", leads: 145 },
      { channel: "Email", leads: 80 },
      { channel: "Referrals", leads: 55 },
    ];

    const multiplier = 0.6 + conversionRate[0] / 5;

    return base.map((item) => ({
      ...item,
      leads: Math.round(item.leads * multiplier),
    }));
  }, [conversionRate]);

  const kpis = useMemo(
    () => ({
      leads: Math.round(visitors[0] * 0.22),
      customers: Math.round(visitors[0] * (conversionRate[0] / 100)),
      roi: Math.round(((monthlyRevenue * 12 - totalInvestment) / totalInvestment) * 100),
    }),
    [conversionRate, monthlyRevenue, totalInvestment, visitors],
  );

  const handleKeyPress = (value: (typeof keypad)[number]) => {
    if (value === "⌫") {
      setProjectCostInput((prev) => prev.slice(0, -1) || "0");
      return;
    }

    setProjectCostInput((prev) => {
      if (prev === "0" && value !== ".") return value;
      if (value === "." && prev.includes(".")) return prev;
      return `${prev}${value}`;
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-6 md:p-10">
      <section className="space-y-4">
        <Badge variant="secondary">Interactive demo app</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          Client Portal ROI Simulator
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          A live, client-facing web app demo showing calculators, sliders, feature toggles,
          and interactive charts that update instantly.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-5 w-5" />
              Project calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-cost">Base project cost</Label>
              <Input
                id="project-cost"
                value={projectCostInput}
                onChange={(event) => setProjectCostInput(event.target.value)}
                inputMode="decimal"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {keypad.map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  onClick={() => handleKeyPress(key)}
                  className="h-10"
                >
                  {key}
                </Button>
              ))}
            </div>

            <div className="rounded-lg border p-3 text-sm">
              <p className="text-muted-foreground">Total investment</p>
              <p className="text-2xl font-semibold">{formatCurrency(totalInvestment)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <SlidersHorizontal className="h-5 w-5" />
              Inputs & feature toggles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Down payment ({downPayment[0]}%)</Label>
                <Slider value={downPayment} onValueChange={setDownPayment} min={0} max={50} step={1} />
              </div>
              <div className="space-y-2">
                <Label>Interest ({interestRate[0].toFixed(1)}%)</Label>
                <Slider value={interestRate} onValueChange={setInterestRate} min={0.5} max={14} step={0.1} />
              </div>
              <div className="space-y-2">
                <Label>Term ({termYears[0]} years)</Label>
                <Slider value={termYears} onValueChange={setTermYears} min={1} max={10} step={1} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Monthly visitors ({visitors[0]})</Label>
                <Slider value={visitors} onValueChange={setVisitors} min={800} max={12000} step={100} />
              </div>
              <div className="space-y-2">
                <Label>Conversion ({conversionRate[0].toFixed(1)}%)</Label>
                <Slider
                  value={conversionRate}
                  onValueChange={setConversionRate}
                  min={1}
                  max={12}
                  step={0.1}
                />
              </div>
              <div className="space-y-2">
                <Label>Avg order ({formatCurrency(avgOrder[0])})</Label>
                <Slider value={avgOrder} onValueChange={setAvgOrder} min={50} max={1000} step={10} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Visual style preset</Label>
              <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value)}>
                <ToggleGroupItem value="minimal">Minimal</ToggleGroupItem>
                <ToggleGroupItem value="modern">Modern</ToggleGroupItem>
                <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-md border p-3">
                <Label htmlFor="ai-chat">AI Chatbot</Label>
                <Switch id="ai-chat" checked={aiChat} onCheckedChange={setAiChat} />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <Label htmlFor="crm-sync">CRM Sync</Label>
                <Switch id="crm-sync" checked={crmSync} onCheckedChange={setCrmSync} />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <Label htmlFor="analytics">Advanced Analytics</Label>
                <Switch
                  id="analytics"
                  checked={advancedAnalytics}
                  onCheckedChange={setAdvancedAnalytics}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monthly payment</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{formatCurrency(monthlyPayment)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projected customers</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{kpis.customers}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" /> 12-mo ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{kpis.roi}%</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="forecast" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="forecast">Revenue Forecast</TabsTrigger>
              <TabsTrigger value="channels">Acquisition Channels</TabsTrigger>
              <TabsTrigger value="funnel">Lead Funnel</TabsTrigger>
            </TabsList>

            <TabsContent value="forecast" className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Area type="monotone" dataKey="revenue" fill="#8b5cf6" fillOpacity={0.2} stroke="#8b5cf6" />
                  <Area type="monotone" dataKey="net" fill="#22c55e" fillOpacity={0.2} stroke="#22c55e" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="channels" className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="funnel" className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { stage: "Visitors", count: visitors[0] },
                    { stage: "Leads", count: kpis.leads },
                    { stage: "Customers", count: kpis.customers },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
