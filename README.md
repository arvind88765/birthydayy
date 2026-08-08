# 🎂 GenZGift - Birthday Greeting Website

A beautiful, interactive birthday greeting website built with Next.js, React, and Tailwind CSS. Perfect for sending personalized birthday wishes with pictures, letters, and surprises!

## ✨ Features

- 🎉 Beautiful hero landing page
- 💌 Interactive greeting card
- 📝 Personalized letter with embedded pictures
- 📸 Picture gallery inside letter
- 🎁 Surprise present reveal
- ✨ Confetti animations
- 🎵 Background music support
- 📱 Fully responsive (mobile & desktop)
- 🚀 Optimized for Vercel deployment

## 🚀 Quick Start

### 1. Clone or Download This Project

```bash
git clone https://github.com/YOUR_USERNAME/genzgift.git
cd genzgift
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser

### 4. Customize

Edit `app/components/GenZGift.jsx`:

```jsx
const name = 'Raj'; // Change to birthday person's name

const letterContent = {
  greeting: `Dear ${name},`,
  body: `Your custom message here...`,
  closing: `Your closing message here...`
};
```

Replace emoji pictures with real images:
```jsx
<img src="/pic1.jpg" alt="Memory" className="w-full md:w-64 h-64 object-cover rounded-lg" />
```

### 5. Deploy to Vercel

#### Option A: Using GitHub (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "GenZGift"
git remote add origin https://github.com/YOUR_USERNAME/genzgift.git
git branch -M main
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repo
5. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and your site will be deployed instantly!

## 📁 Project Structure

```
genzgift/
├── app/
│   ├── components/
│   │   └── GenZGift.jsx      # Main component
│   ├── layout.jsx             # Root layout
│   ├── page.jsx               # Home page
│   └── globals.css            # Global styles
├── public/                     # Static files (images, music)
├── package.json               # Dependencies
├── next.config.js             # Next.js config
├── tailwind.config.js         # Tailwind config
└── postcss.config.js          # PostCSS config
```

## 🎨 Customization

### Change Colors

Edit `app/layout.jsx` to change the gradient:

```jsx
<body className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen">
```

Available Tailwind gradients:
- `from-pink-100 via-purple-100 to-blue-100` (Current)
- `from-yellow-100 via-orange-100 to-red-100` (Warm)
- `from-blue-100 via-cyan-100 to-teal-100` (Cool)
- `from-purple-100 via-pink-100 to-red-100` (Hot Pink)

### Add Pictures

1. Create `public` folder in project root
2. Add your images:
   ```
   public/
   ├── pic1.jpg
   ├── pic2.jpg
   └── pic3.jpg
   ```

3. Replace emoji in `GenZGift.jsx`:
   ```jsx
   <img src="/pic1.jpg" alt="Memory" className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-white" />
   ```

### Add Music

1. Add MP3 file to `public/bgm.mp3`
2. Edit `GenZGift.jsx` and uncomment the audio code (search for "bgm.mp3")

## 🌐 Environment Variables (Optional)

Create `.env.local` file:

```env
NEXT_PUBLIC_SITE_NAME=GenZGift
```

## 📱 Mobile & Desktop Optimization

This site is fully responsive and tested on:
- ✅ iPhone (iOS)
- ✅ Android phones
- ✅ Tablets
- ✅ Desktops
- ✅ Laptops

All animations and interactions work smoothly on all devices.

## 🆘 Troubleshooting

**Confetti not showing?**
- Ensure `canvas-confetti` is installed: `npm install canvas-confetti`

**Images not loading?**
- Place images in `public/` folder
- Use relative paths: `/pic1.jpg`

**Slow deployment?**
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Music not playing?**
- Some browsers block autoplay
- User might need to click first
- Check browser console for errors

## 🎁 Features to Add Later

- Video message support
- Spotify playlist integration
- Guest comments/messages
- Multiple birthday person support
- Theme customization UI
- Sound effects

## 📚 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: JavaScript/JSX
- **Animation**: Canvas Confetti
- **Hosting**: Vercel (Free)

## 📄 License

MIT License - feel free to use this for any purpose!

## 🎉 Have Fun!

Share the link with the birthday person and watch their smile! 

```
https://genzgift.vercel.app
```

---

**Made with ❤️ for GenZ birthdays**

## 📞 Support

For issues with Vercel deployment: https://vercel.com/docs
For Next.js help: https://nextjs.org/docs
For Tailwind CSS: https://tailwindcss.com/docs

Enjoy! 🎂✨
