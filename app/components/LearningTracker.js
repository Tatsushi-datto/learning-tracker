import React, { useState, useEffect } from 'react';
import { Calendar, Star, Trophy, Target, Sparkles, Heart } from 'lucide-react';

export default function LearningTracker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyGoals, setMonthlyGoals] = useState({});
  const [completedDays, setCompletedDays] = useState({});
  const [rewards, setRewards] = useState({});
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [earnedReward, setEarnedReward] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [editingReward, setEditingReward] = useState(false);

  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  
  // 月の日数を取得
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 月の最初の曜日を取得
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 達成率を計算
  const getAchievementRate = () => {
    const completed = completedDays[monthKey] || [];
    const totalDays = getDaysInMonth(currentDate);
    return Math.round((completed.length / totalDays) * 100);
  };

  // 励ましの言葉を取得
  const getEncouragement = () => {
    const rate = getAchievementRate();
    const week = Math.ceil(new Date().getDate() / 7);
    
    if (rate >= 80) return "すごい！このちょうしでがんばろう！🌟";
    if (rate >= 60) return "いいかんじ！もうすこしでごほうびだよ！💪";
    if (rate >= 40) return "がんばってるね！まいにちつづけよう！😊";
    if (rate >= 20) return "きょうもがんばろう！きみならできる！🌈";
    return "さあ、はじめよう！たのしくまなぼう！🎯";
  };

  // 日付をクリック
  const toggleDay = (day) => {
    const completed = completedDays[monthKey] || [];
    const dayIndex = completed.indexOf(day);
    
    if (dayIndex > -1) {
      completed.splice(dayIndex, 1);
    } else {
      completed.push(day);
    }
    
    setCompletedDays({
      ...completedDays,
      [monthKey]: [...completed]
    });

    // 80%達成チェック
    const newRate = Math.round((completed.length / getDaysInMonth(currentDate)) * 100);
    if (newRate >= 80 && !earnedReward) {
      setEarnedReward(rewards[monthKey] || 'すてきなごほうび');
      setShowRewardModal(true);
    }
  };

  // 月を変更
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // カレンダーの日付を生成
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const completed = completedDays[monthKey] || [];
    const days = [];

    // 空白の日
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // 月の日付
    for (let day = 1; day <= daysInMonth; day++) {
      const isCompleted = completed.includes(day);
      const isToday = currentDate.getFullYear() === new Date().getFullYear() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      day === new Date().getDate();
      
      days.push(
        <button
          key={day}
          onClick={() => toggleDay(day)}
          className={`
            relative p-2 h-20 rounded-lg border-2 transition-all transform hover:scale-105
            ${isCompleted 
              ? 'bg-gradient-to-br from-yellow-300 to-orange-400 border-yellow-500 shadow-lg' 
              : 'bg-white border-gray-200 hover:border-blue-300'
            }
            ${isToday ? 'ring-4 ring-blue-400' : ''}
          `}
        >
          <span className={`text-lg font-bold ${isCompleted ? 'text-white' : 'text-gray-700'}`}>
            {day}
          </span>
          {isCompleted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-10 h-10 text-yellow-100 animate-pulse" fill="currentColor" />
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              がくしゅうカレンダー
            </h1>
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-bold text-purple-600">{getAchievementRate()}%</span>
            </div>
          </div>

          {/* 月の切り替え */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-700">
              {currentDate.getFullYear()}ねん {currentDate.getMonth() + 1}がつ
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <span className="text-2xl">→</span>
            </button>
          </div>

          {/* 学習目標 */}
          <div className="mb-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                <span className="font-bold text-gray-700">こんげつのもくひょう：</span>
              </div>
              <button
                onClick={() => setEditingGoal(!editingGoal)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                へんしゅう
              </button>
            </div>
            {editingGoal ? (
              <input
                type="text"
                value={monthlyGoals[monthKey] || ''}
                onChange={(e) => setMonthlyGoals({...monthlyGoals, [monthKey]: e.target.value})}
                onBlur={() => setEditingGoal(false)}
                className="mt-2 w-full p-2 rounded-lg border-2 border-blue-300 text-lg"
                placeholder="れい：まいにち かんじを 5こ かく"
                autoFocus
              />
            ) : (
              <p className="text-lg mt-2 text-gray-800">
                {monthlyGoals[monthKey] || 'もくひょうを せっていしよう！'}
              </p>
            )}
          </div>

          {/* ご褒美設定 */}
          <div className="mb-4 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-600" />
                <span className="font-bold text-gray-700">80%たっせいの ごほうび：</span>
              </div>
              <button
                onClick={() => setEditingReward(!editingReward)}
                className="text-sm bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
              >
                へんしゅう
              </button>
            </div>
            {editingReward ? (
              <input
                type="text"
                value={rewards[monthKey] || ''}
                onChange={(e) => setRewards({...rewards, [monthKey]: e.target.value})}
                onBlur={() => setEditingReward(false)}
                className="mt-2 w-full p-2 rounded-lg border-2 border-purple-300 text-lg"
                placeholder="れい：すきな おかしを かう"
                autoFocus
              />
            ) : (
              <p className="text-lg mt-2 text-gray-800">
                {rewards[monthKey] || 'ごほうびを せっていしよう！'}
              </p>
            )}
          </div>

          {/* 励ましの言葉 */}
          <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
            <p className="text-xl font-bold text-gray-800">{getEncouragement()}</p>
          </div>
        </div>

        {/* カレンダー */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど'].map((day) => (
              <div key={day} className="text-center font-bold text-gray-600 text-lg">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </div>

        {/* ご褒美モーダル */}
        {showRewardModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-bounce-in">
              <div className="text-center">
                <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-4" />
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  おめでとう！ 🎉
                </h3>
                <p className="text-xl mb-6 text-gray-700">
                  80%たっせい！<br />
                  ごほうび：<span className="font-bold text-purple-600">{earnedReward}</span>
                </p>
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:scale-105 transition-transform"
                >
                  やったー！
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}