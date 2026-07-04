export const folders = [
  { id: 1, name: "개발" },
  { id: 2, name: "디자인" },
  { id: 3, name: "뉴스" },
  { id: 4, name: "영상" },
];

export const links = [
  {
    id: 1,
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "Next.js의 공식 문서입니다. 라우팅, 데이터 패칭 등 모든 기능을 다룹니다.",
    folderId: 1,
  },
  {
    id: 2,
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 퍼스트 CSS 프레임워크로 빠르게 UI를 만들 수 있습니다.",
    folderId: 1,
  },
  {
    id: 3,
    title: "Figma",
    url: "https://figma.com",
    description: "웹 기반 UI/UX 디자인 협업 툴입니다.",
    folderId: 2,
  },
  {
    id: 4,
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    description: "Y Combinator가 운영하는 테크 커뮤니티 뉴스 사이트입니다.",
    folderId: 3,
  },
  {
    id: 5,
    title: "YouTube",
    url: "https://youtube.com",
    description: "세계 최대의 동영상 스트리밍 플랫폼입니다.",
    folderId: 4,
  },
  {
    id: 6,
    title: "Vercel",
    url: "https://vercel.com",
    description: "Next.js를 만든 팀의 배포 플랫폼입니다.",
    folderId: 1,
  },
];
