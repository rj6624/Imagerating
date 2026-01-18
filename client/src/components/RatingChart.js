import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ratingService from '../services/ratingService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RatingChart = ({ refreshTrigger }) => {
  const [stats, setStats] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      const response = await ratingService.getRatingStats();
      setStats(response.stats);
      setTotalRatings(response.totalRatings);
      setAverageRating(response.averageRating);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: stats.map(s => '★'.repeat(s.rating)),
    datasets: [
      {
        label: 'Number of Ratings',
        data: stats.map(s => s.count),
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(234, 179, 8, 0.6)',
          'rgba(234, 179, 8, 0.5)',
          'rgba(234, 179, 8, 0.4)',
        ],
        borderColor: [
          'rgb(234, 179, 8)',
          'rgb(234, 179, 8)',
          'rgb(234, 179, 8)',
          'rgb(234, 179, 8)',
          'rgb(234, 179, 8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} ${context.parsed.y === 1 ? 'rating' : 'ratings'}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Rating Statistics</h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{averageRating}</div>
          <div className="text-sm text-gray-600">{totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}</div>
        </div>
      </div>

      {totalRatings > 0 ? (
        <div className="h-80">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No ratings yet. Be the first to rate!</p>
        </div>
      )}

      <div className="mt-6 space-y-2">
        {stats.map((stat) => (
          <div key={stat.rating} className="flex items-center gap-3">
            <div className="w-20 text-yellow-500 font-medium">
              {'★'.repeat(stat.rating)}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-500 rounded-full"
                style={{
                  width: totalRatings > 0 ? `${(stat.count / totalRatings) * 100}%` : '0%'
                }}
              ></div>
            </div>
            <div className="w-12 text-right text-gray-600 font-medium">
              {stat.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingChart;
