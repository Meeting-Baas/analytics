"use client";

import { Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface ErrorType {
    type: string;
    count: number;
    percentage: number;
}

interface BotErrorAnalysisProps {
    errorTypes: ErrorType[];
}

export function BotErrorAnalysis({ errorTypes }: BotErrorAnalysisProps) {
    // Create chart config
    const chartConfig = errorTypes.reduce((acc, error) => {
        return {
            ...acc,
            [error.type.toLowerCase().replace(/\s+/g, "_")]: {
                label: error.type,
                color: `hsl(var(--chart-${(Object.keys(acc).length % 5) + 1}))`,
            },
        };
    }, {} as ChartConfig);

    // Transform data for recharts
    const chartData = errorTypes.map((error) => ({
        name: error.type.toLowerCase().replace(/\s+/g, "_"),
        value: error.count,
        label: error.type,
        percentage: error.percentage,
    }));

    return (
        <div className="space-y-4">
            {/* Chart card */}
            <Card className="p-4">
                <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                                    labelLine={false}
                                >
                                    {chartData.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={`var(--color-${entry.name})`}
                                        />
                                    ))}
                                </Pie>
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            formatter={(value: any) => formatNumber(value)}
                                        />
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </Card>

            {/* Error breakdown card */}
            <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Error Type Breakdown</h3>
                <div className="space-y-3">
                    {errorTypes.map((error) => (
                        <div key={error.type} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: `hsl(var(--chart-${(errorTypes.indexOf(error) % 5) + 1}))`
                                    }}
                                />
                                <span className="text-sm">{error.type}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-sm text-muted-foreground">{formatNumber(error.count)}</span>
                                <span className="text-sm font-medium">{formatPercentage(error.percentage)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
} 