# PRD — 야식탁 Late Night Table 웹사이트

## 1. 개요

야식탁(Late Night Table)은 시드니 North Strathfield에 위치한 한식-양식 퓨전 안주바(anju bar)다. 늦은 시간까지 영업하며 대창떡볶이, 트러플 파스타, 소주/막걸리 등 한식 재료와 양식 조리법을 결합한 메뉴가 특징이다.

본 프로젝트는 매장을 처음 접하는 방문객에게 브랜드 톤(다크·골드 톤의 프리미엄 나이트 다이닝)을 전달하고, 실제 메뉴/영업정보/예약 도구를 한 페이지에서 제공하는 싱글 페이지 웹사이트를 구축하는 것을 목표로 한다.

- **레포**: `late-night-table-website`
- **스택**: React 19 + Vite + TypeScript + Tailwind CSS v4
- **형태**: 싱글 페이지 애플리케이션 (섹션 앵커 스크롤 방식)

## 2. 목표

1. 매장의 실제 메뉴와 영업 정보를 정확하게 노출한다.
2. "늦은 밤에도 문 여는 곳"이라는 브랜드 무드를 시각적으로 전달한다.
3. 방문객이 예약 문의를 남길 수 있는 창구를 제공한다.
4. 데스크톱/모바일 반응형으로 동작한다.

## 3. 타겟 유저

- North Strathfield / 시드니 인근에서 늦은 시간 식사·술자리를 찾는 20~40대
- 인스타그램(@late.night.table) 등 SNS를 통해 유입되는 잠재 고객
- 매장 위치·영업시간·메뉴·가격을 사전에 확인하려는 신규 방문객

## 4. 범위

### In Scope
- 싱글 페이지 웹사이트 (Hero / Menu / About / Contact / Footer)
- 실제 메뉴 데이터 반영 (Pots & Sides / Mains & Meals / Drinks 탭)
- 매장 정보 반영 (주소, 전화번호, 영업시간, 인스타그램)
- 예약 문의 폼 (프론트엔드 UI만, 실제 전송/백엔드 연동 없음)
- 반응형 레이아웃 (데스크톱 / 모바일)

### Out of Scope (향후 과제)
- 예약 폼 실제 제출 처리 (이메일 발송, DB 저장, 캘린더 연동 등 백엔드)
- 다국어 지원 (현재 영문 기반, 한글은 브랜드명/카피 일부에만 사용)
- 온라인 결제·포장 주문 연동
- CMS 연동을 통한 메뉴/가격 자동 갱신 (현재는 코드 내 하드코딩)
- 실시간 웨이팅/좌석 현황

## 5. 기능 요구사항

### 5.1 헤더 / 내비게이션
- 상단 고정(sticky) 헤더, 스크롤 시 배경 블러 처리
- 로고(Late Night Table), Menu / About Us / Contact 앵커 링크
- "Reserve a Table" CTA 버튼 → Contact 섹션으로 스크롤
- 모바일: 햄버거 메뉴로 전환

### 5.2 히어로 섹션
- 매장 풀샷 이미지 + 그라데이션 오버레이
- 헤드라인: "Korean-Western Fusion, Late Into the Night."
- 서브카피: 매장 위치/컨셉/영업시간 요약
- CTA 2종: View Menu / Reserve a Table

### 5.3 메뉴 섹션
- 탭 3종: **Pots & Sides**, **Mains & Meals**, **Drinks**
- 각 탭 내 카테고리 소제목(예: Pots, Sides, Mains, Meals, Soju & Spirits, Rice Wine, Highball, Beer & Wine)으로 그룹핑
- 항목별 이름 / (선택) 설명(예: "Very spicy", "Popular", "New") / 가격 노출
- 실제 매장 키오스크 메뉴([kpos.com.au](https://www.kpos.com.au/latenighttable/index_table.php?tableno=996)) 기준 데이터 사용
- 스크롤 진입 시 페이드인 애니메이션

### 5.4 About 섹션
- 매장 스토리 카피 (한식-양식 퓨전 안주바 컨셉 설명)
- 통계 카드 3종: Cuisine(K-Fusion) / Signature(5Hap) / Open Until(Midnight)
- 매장 이미지 2장 레이아웃

### 5.5 Contact / 예약 섹션
- 매장 정보: 주소(5 George Street, North Strathfield NSW 2137), 전화(+61 450 506 200)
- 영업시간: 월요일 휴무, 화~토 11am–자정, 일 11am–11pm
- 인스타그램 링크(@late.night.table)
- 지도 플레이스홀더
- 예약 폼: 이름 / 날짜 / 시간 / 인원수 / 요청사항 → 제출 시 확인 메시지 표시 (현재 프론트엔드 상태값만 처리, 실제 전송 로직 없음)

### 5.6 푸터
- 매장명, 한 줄 소개
- 내비게이션 링크 재노출
- 인스타그램 링크
- 저작권 / 주소 정보

## 6. 콘텐츠 요구사항

| 항목 | 값 |
|---|---|
| 매장명 | Late Night Table (야식탁) |
| 컨셉 | 한식-양식 퓨전 안주바 |
| 주소 | 5 George Street, North Strathfield NSW 2137 |
| 전화 | +61 450 506 200 |
| 영업시간 | 화~토 11am–자정, 일 11am–11pm, 월 휴무 |
| 인스타그램 | @late.night.table |
| 시그니처 메뉴 | Late Night Table 5Hap |

메뉴 데이터는 `src/App.tsx`의 `menuData` 객체에서 관리하며, 가격/설명 변경 시 해당 객체만 수정하면 된다.

## 7. 디자인 요구사항

- **톤앤매너**: 다크(차콜) 배경 + 골드(#C9A15A) 포인트, 프리미엄 나이트 다이닝 무드
- **타이포그래피**: 헤딩 — Fraunces(세리프), 본문 — Inter(산세리프)
- **레이아웃**: 최대 폭 1340px 중앙 정렬, 섹션 간 여백 넉넉하게
- **인터랙션**: IntersectionObserver 기반 스크롤 페이드인, 버튼/링크 hover 트랜지션
- **컬러 시스템**: GOLD / IVORY / CHARCOAL / BURGUNDY 상수로 관리 (`src/App.tsx` 상단)

## 8. 비기능 요구사항

- **반응형**: 960px 이하 태블릿/모바일 레이아웃 전환 (메뉴 그리드 1열, 내비 햄버거 전환 등)
- **접근성**: 버튼에 명확한 라벨, 이미지 alt 텍스트 제공
- **성능**: 외부 이미지는 Unsplash CDN 리사이즈 파라미터 사용, 별도 이미지 최적화 파이프라인은 범위 외
- **호환성**: 최신 Chrome/Safari/Edge 기준 (React 19 + Vite 8 지원 범위)

## 9. 성공 지표 (제안)

- 메뉴/영업정보 문의 전화 대비 웹사이트 방문 후 문의 비율 증가
- 예약 폼 제출 수 (백엔드 연동 후 측정 가능)
- 인스타그램 프로필 유입 클릭 수

## 10. 오픈 이슈

- 예약 폼 제출 시 실제 알림(이메일/문자/전화)을 받을 방법 결정 필요
- 지도 섹션을 실제 Google Maps 임베드로 교체할지 여부
- 메뉴 가격/품절 여부를 수동 갱신할지, 추후 CMS 연동할지 결정 필요
