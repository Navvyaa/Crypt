# CrypTracker

A real-time cryptocurrency tracker built that leverages **Binance's WebSocket API** for lightning-fast updates. View live prices  and track your favorite crypto assets all in one place.


---

## 🧪 Getting Started

Follow these steps to get the project up and running locally:

### 1. **Clone the Repository**

```bash
git clone https://github.com/Navvyaa/Crypt.git
cd Crypt
```
### 2. **Install the dependencies**

```bash
npm install
```

### 3. **Run the Development Server**

```bash
npm run dev
```

Your app will start on http://localhost:5173/ (or another available port).


## 🛠️ Tech Stack

- **Frontend**: React
- **State Management**: Redux Toolkit
- **Styling**:Tailwind CSS
- **Real-Time Data**: Binance WebSocket API

  
## 🧱 Architecture Overview

```bash
📦 src
├── data/                # Stores static data like name, logo ,graph etc
├── components/          # Reusable UI components
│   ├── Table.jsx        # Renders live crypto data in tabular form
│   ├── Tracker.jsx      # Main tracker UI + WebSocket handler
│   └── TipTool.jsx      # Tooltip component for hints/tooltips
├── redux/               # Redux store and slices
│   ├── store.js         # Configures the Redux store
│   └── cryptoSlice.js   # Manages crypto-related state and actions
├── App.jsx              # Root component with layout/routes
└── main.jsx             # Application entry point
```
