# Lottie Animations

Place your Lottie JSON files here:

- `typing.json` - AI Mentor typing indicator
- `coin_drop.json` - Payment/stipend animation
- `scanner.json` - QR code scanning animation

You can get free Lottie animations from:
- https://lottiefiles.com/
- https://lordicon.com/

## Usage

```tsx
import Lottie from 'lottie-react';
import typingAnimation from '@/public/lottie/typing.json';

<Lottie animationData={typingAnimation} loop={true} />
```
