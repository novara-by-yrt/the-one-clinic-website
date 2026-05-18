const fs = require('fs');
const { createCanvas } = require('canvas');

const doctors = [
  { name: 'Mr Ashish Kelkar', initials: 'AK' },
  { name: 'Dr Veena Patel', initials: 'VP' },
  { name: 'Professor Prashanth Patel', initials: 'PP' },
  { name: 'Mr Randeep Aujla', initials: 'RA' },
];

doctors.forEach(doctor => {
  const canvas = createCanvas(400, 500);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, '#0066cc');
  gradient.addColorStop(1, '#004499');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 500);
  
  // Draw initials
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(doctor.initials, 200, 250);
  
  // Save file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`team-${doctor.initials.toLowerCase()}.png`, buffer);
  console.log(`Created placeholder for ${doctor.name}`);
});
