export default function generateFourDigitCode() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}
