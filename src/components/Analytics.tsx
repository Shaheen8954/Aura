import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Users, Eye, Download, Share2, TrendingUp, ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Mon', views: 400, downloads: 240 },
  { name: 'Tue', views: 300, downloads: 139 },
  { name: 'Wed', views: 200, downloads: 980 },
  { name: 'Thu', views: 278, downloads: 390 },
  { name: 'Fri', views: 189, downloads: 480 },
  { name: 'Sat', views: 239, downloads: 380 },
  { name: 'Sun', views: 349, downloads: 430 },
];

const themeData = [
  { name: 'Terminal', value: 400 },
  { name: 'Pipeline', value: 300 },
  { name: 'CEO', value: 300 },
  { name: 'SRE', value: 200 },
];

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b'];

export const Analytics = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '12.4k', icon: Eye, color: 'text-blue-500', trend: '+12%' },
          { label: 'Downloads', value: '2.8k', icon: Download, color: 'text-emerald-500', trend: '+18%' },
          { label: 'Shares', value: '842', icon: Share2, color: 'text-purple-500', trend: '+5%' },
          { label: 'Active Users', value: '1.2k', icon: Users, color: 'text-amber-500', trend: '+24%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} className="mr-1" />
                {stat.trend}
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Engagement Overview</h3>
            <select className="text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-1.5 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="downloads" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Popular Themes</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={themeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {themeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {themeData.map((theme, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{theme.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{theme.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
