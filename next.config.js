/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
      styledComponents: true,
    },
    eslint: {
      // ESLint 체크를 완전히 비활성화
      ignoreDuringBuilds: true,
    },
  }
  
  module.exports = nextConfig