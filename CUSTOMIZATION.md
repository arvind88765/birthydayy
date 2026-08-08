# 🎨 Customization Guide

Complete guide to customize GenZGift for your needs.

## 🎯 Basic Customization (30 seconds)

### Change Birthday Person's Name

Edit `app/components/GenZGift.jsx`:

```jsx
// Line 13
const name = 'Raj'; // Change to birthday person's name
```

### Change the Message

In the same file:

```jsx
const letterContent = {
  greeting: `Dear ${name},`, // Change if needed
  body: `Your custom message here...
  
Write whatever you want! Multi-line is fine.`,
  closing: `Your closing message here...
  
Add more personal touches!`
};
```

### Change Picture Captions

```jsx
const pics = [
  { id: 1, caption: 'Your custom caption here 😂' },
  { id: 2, caption: 'Another caption ❤️' },
  { id: 3, caption: 'Last caption 🎉' },
];
```

---

## 🖼️ Add Real Pictures

### Method 1: Using public folder

1. Create `public` folder in project root (if it doesn't exist)
2. Add your images:
   ```
   genzgift/
   └── public/
       ├── pic1.jpg
       ├── pic2.jpg
       └── pic3.jpg
   ```

3. In `GenZGift.jsx`, replace emoji with images:

```jsx
// Find this (around line 180):
<div className="w-full md:w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-300 rounded-lg shadow-lg flex items-center justify-center text-6xl border-4 border-white">
  📸
</div>

// Replace with:
<img 
  src="/pic1.jpg" 
  alt="Memory 1" 
  className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-white"
/>
```

4. Do the same for pic2.jpg and pic3.jpg

### Method 2: Using Cloudinary (Free Cloud Storage)

1. Go to https://cloudinary.com/users/register/free
2. Sign up (free account)
3. Upload your images
4. Get the image URL
5. Use in GenZGift.jsx:

```jsx
<img 
  src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/v123/pic1.jpg" 
  alt="Memory 1" 
  className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-white"
/>
```

### Method 3: Using Image URLs

You can use any image URL:

```jsx
<img 
  src="https://example.com/your-image.jpg" 
  alt="Memory" 
  className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-white"
/>
```

---

## 🎵 Add Background Music

### Step 1: Get an MP3 file

- Free music: Pexels.com, Pixabay.com, YouTube Audio Library
- Download as MP3

### Step 2: Add to project

1. Create `public/` folder (if doesn't exist)
2. Add `bgm.mp3`:
   ```
   genzgift/
   └── public/
       └── bgm.mp3
   ```

### Step 3: Enable in GenZGift.jsx

Find this section (around line 35):

```jsx
const [musicPlaying, setMusicPlaying] = useState(true);
```

After it, add:

```jsx
const [audio] = useState(() => {
  if (typeof window !== 'undefined') {
    const a = new Audio('/bgm.mp3');
    a.loop = true;
    a.volume = 0.3; // 0 to 1 (0.3 = 30%)
    return a;
  }
  return null;
});

useEffect(() => {
  if (musicPlaying && audio) {
    audio.play().catch(e => console.log('Audio play failed'));
  } else if (audio) {
    audio.pause();
  }
}, [musicPlaying, audio]);
```

---

## 🎨 Change Colors

### Hero Section

Edit `app/components/GenZGift.jsx`:

```jsx
// Line 94 - change gradient
className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"

// Color options:
// Pink/Purple/Blue (current): from-pink-600 via-purple-600 to-blue-600
// Orange/Red/Pink: from-orange-600 via-red-600 to-pink-600
// Blue/Cyan/Teal: from-blue-600 via-cyan-600 to-teal-600
// Purple/Pink/Red: from-purple-600 via-pink-600 to-red-600
```

### Button

```jsx
// Line 103 - change button gradient
className="... bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 ..."

// Options:
// from-orange-500 to-red-500
// from-blue-500 to-cyan-500
// from-green-500 to-emerald-500
```

### Card Background

```jsx
// Line 144 - change card gradient
className="... bg-gradient-to-br from-yellow-100 to-pink-100 ..."

// Options:
// from-purple-100 to-pink-100
// from-blue-100 to-cyan-100
// from-green-100 to-emerald-100
```

### Body Background

Edit `app/layout.jsx`:

```jsx
<body className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen">

// Options:
// from-orange-100 via-red-100 to-pink-100
// from-blue-100 via-cyan-100 to-teal-100
// from-purple-100 via-pink-100 to-red-100
```

---

## ✏️ Change Fonts

Add to `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
```

Or use Google Fonts:
- Poppins (modern)
- Raleway (elegant)
- Montserrat (bold)
- Playfair Display (luxury)
- Fredoka (friendly)

---

## 🎯 Change Animation Speed

In `app/globals.css`, find animations and adjust:

```css
@keyframes fadeIn {
  /* 0.6s is the duration, change to 0.3s, 1s, etc */
  animation: fadeIn 0.6s ease-out;
}
```

Faster (snappy): 0.3s
Slower (smooth): 1s

---

## 📱 Mobile Optimizations

The site is already mobile-optimized! But you can tweak:

```jsx
// In GenZGift.jsx, adjust text sizes:
className="text-5xl md:text-6xl"
// text-5xl = Mobile size
// md:text-6xl = Desktop size

// Adjust spacing:
className="p-4 md:p-12"
// p-4 = Mobile padding
// md:p-12 = Desktop padding
```

---

## 🔧 Advanced Customization

### Add More Pictures

Add more pictures to the letter:

```jsx
{/* Picture 4 */}
<div className="flex flex-col items-center space-y-2">
  <img 
    src="/pic4.jpg" 
    alt="Memory 4" 
    className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-white"
  />
  <p className="text-xs md:text-sm text-gray-600 italic text-center">
    Your caption here 🎉
  </p>
</div>
```

### Add Video Message

```jsx
<video width="320" height="240" controls className="rounded-lg shadow-lg">
  <source src="/message.mp4" type="video/mp4" />
</video>
```

### Add Spotify Playlist

```jsx
<iframe 
  style={{borderRadius:"12px"}} 
  src="https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID" 
  width="100%" 
  height="380" 
  frameBorder="0" 
  allowFullScreen="" 
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
/>
```

### Change Confetti Colors

In `GenZGift.jsx`, find `triggerConfetti`:

```jsx
const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#fbbf24', '#f87171', '#60a5fa'] // Add custom colors!
  });
};
```

---

## 🧪 Test Locally First

Before pushing to Vercel:

```bash
npm run dev
```

Visit `http://localhost:3000` and test:
- ✅ Click button
- ✅ Card opens
- ✅ Pictures load
- ✅ Scroll works
- ✅ Present opens
- ✅ Mobile view (inspect in browser)

---

## 🚀 Deploy After Changes

```bash
# Push to GitHub
git add .
git commit -m "Customized GenZGift"
git push origin main

# Vercel auto-deploys!
# OR manually via Vercel dashboard
```

---

## 💡 Quick Copy-Paste Customizations

### Romantic Vibe

```jsx
// Change colors to roses/reds
from-red-100 via-pink-100 to-rose-100
from-red-600 via-pink-600 to-rose-600

// Romantic message:
body: `You make my heart skip a beat every single day...`
```

### Fun & Chaotic

```jsx
// Change colors to rainbow
from-rainbow...

// Fun message:
body: `We're absolute CHAOS together and I love it! 😂`
```

### Elegant

```jsx
// Change to neutral colors
from-gray-100 via-stone-100 to-neutral-100
from-gray-700 via-stone-700 to-neutral-700

// Elegant serif font:
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
font-family: 'Playfair Display', serif;
```

---

## 📝 Need Help?

Check:
1. README.md - General info
2. DEPLOYMENT_GUIDE.md - Deployment help
3. Console errors (Browser F12 → Console tab)

---

Have fun customizing! 🎨✨
