"use client";

import { endOfDay, format, startOfDay, subDays } from "date-fns";
import { useState, useMemo } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("1M");
  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();

    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    //Filtering transactions within the date range
    const filtered = transactions.filter((t) => {
      return new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now);
    });

    //Grouping transactions by date

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd"); // JUL 02
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }

      return acc;
    }, {});

    //Converting the grouped object into an array and sorting by date

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  //Calculating totals for the selected period

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, date) => {
        return {
          income: acc.income + date.income,
          expense: acc.expense + date.expense,
        };
      },
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <>
      {transactions.length > 0 && (
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Transaction Overview</CardTitle>
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DATE_RANGES).map(([key, { label }]) => {
                  return (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around mb-6 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Total Income</p>
                <p className="text-lg font-bold text-green-500">
                  ₹{totals.income.toFixed(2)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground">Total Expenses</p>
                <p className="text-lg font-bold text-red-500">
                  ₹{totals.expense.toFixed(2)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground">Net</p>
                <p
                  className={`text-lg font-bold ${
                    totals.income - totals.expense < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  ₹{(totals.income - totals.expense).toFixed(2)}
                </p>
              </div>
            </div>
            {/* Chart */}

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value.toFixed(2)}`, undefined]}
                  />
                  <Legend />
                  <Bar
                    dataKey="income"
                    name="Income"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    name="Expense"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AccountChart;
