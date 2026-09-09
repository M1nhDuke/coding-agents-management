import React, { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage('Error connecting to backend'));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Student Accommodation Platform</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-xl text-gray-700">Backend Status: <span className="font-mono font-bold text-blue-600">{message}</span></p>
      </div>
    </main>
  );
}
