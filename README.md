# まいにち がんばろう！ - 学習カレンダー

小学2年生向けの楽しい学習管理アプリです。毎日の学習を記録して、目標達成でご褒美をゲットしましょう！

![Learning Tracker](https://img.shields.io/badge/Next.js-14.2.3-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-blue)

## 🌟 機能

- 📅 月単位のカレンダー表示
- ✨ 達成した日にシール（星マーク）を貼る
- 🎯 月単位での学習目標設定
- 🎁 60%達成でご褒美がもらえる
- 💬 週ごとの励ましメッセージ
- 🌈 土日は特別な色で表示

## 🚀 デプロイ方法（Vercel）

### 前提条件
- GitHubアカウント
- Vercelアカウント（GitHubでサインアップ可能）

### 手順

1. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "Initial commit: 学習カレンダーアプリ"
   git push origin main
   ```

2. **Vercelでデプロイ**
   1. [Vercel](https://vercel.com)にアクセス
   2. "New Project"をクリック
   3. GitHubリポジトリを選択
   4. "Import"をクリック
   5. 設定はデフォルトのままで"Deploy"をクリック

3. **デプロイ完了！**
   - デプロイが完了すると、自動的にURLが発行されます
   - 例: `https://your-project-name.vercel.app`

## 🛠️ ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## 📱 使い方

1. **学習目標を設定**
   - 「こんげつの もくひょう」の「へんしゅう」ボタンをクリック
   - 例：「まいにち かんじを 5こ れんしゅう」

2. **ご褒美を設定**
   - 「60%たっせいの ごほうび」の「へんしゅう」ボタンをクリック
   - 例：「すきな おかしを かう」

3. **毎日の学習を記録**
   - 学習が終わったら、カレンダーの日付をクリック
   - 星のシールが貼られます

4. **達成率をチェック**
   - 右上に現在の達成率が表示されます
   - 60%を超えるとご褒美がもらえます！

## 🎨 技術スタック

- **Next.js 14** - Reactフレームワーク
- **React 18** - UIライブラリ
- **Tailwind CSS** - スタイリング
- **Lucide React** - アイコン
- **Google Fonts (Kiwi Maru)** - 日本語フォント

## 📄 ライセンス

MIT License
