import React from 'react';
import { Container, Link, Typography } from '@material-ui/core';

export default function PrivacyPolicy() {
  return (
    <Container>
      <Typography variant="h1">UOSTime 개인정보처리방침</Typography>
      <Typography>
        UOSTime은 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고
        있으며, 이용자의 권리(개인정보 자기결정권)를 적극적으로 보장하며,
        대한민국의 개인정보보호 규정 및 가이드라인을 준수하고 있습니다. 본
        개인정보처리방침은 UOSTime의 서비스 사용자에게 적용됩니다.
      </Typography>
      <Typography variant="h2">1. 처리하는 개인정보 항목</Typography>
      <Typography variant="h3">회원정보</Typography>
      <ul>
        <Typography component="li">
          항목: 아이디, 비밀번호, 서울시립대학교 이메일 주소 또한 서비스
        </Typography>
      </ul>
      이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
      <ul>
        <Typography component="li">
          서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보 등
        </Typography>
      </ul>
      <Typography variant="h2">2. 개인정보 수집 방법</Typography>
      <Typography>
        UOSTime은 사용자의 개인정보를 사용자의 입력 또는 생성정보 수집 도구를
        통해 수집합니다.
      </Typography>
      <Typography variant="h2">3. 개인정보 처리목적</Typography>
      <Typography>
        UOSTime은 사용자의 개인정보를 다음과 같은 목적으로만 사용하며, 목적이
        변경될 경우에는 웹사이트 공지사항(또는 개별공지)을 통해 사전에 고지할
        것입니다.
      </Typography>
      <Typography variant="h3">홈페이지 회원가입 및 관리</Typography>
      <Typography>
        회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격
        유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 분쟁 조정을 위한 기록
        보존 등을 목적으로 개인정보를 처리합니다.
      </Typography>
      <Typography variant="h3">민원사무 처리</Typography>
      <Typography>
        민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과
        통보 등을 목적으로 개인정보를 처리합니다.
      </Typography>
      <Typography variant="h3">재화 또는 서비스 제공</Typography>
      <Typography>
        서비스 제공, 콘텐츠 제공 등을 목적으로 개인정보를 처리합니다.
      </Typography>
      <Typography variant="h3">마케팅에의 활용</Typography>
      <Typography>
        신규 서비스(제품) 개발 및 맞춤 서비스 제공, 인구통계학적 특성에 따른
        서비스 제공, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스
        이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
      </Typography>
      <Typography variant="h2">4. 개인정보의 처리 및 보유기간</Typography>
      <Typography>
        UOSTime은 사용자의 개인정보를 목적 달성을 위한 기간 동안에만 제한적으로
        처리하며, 목적이 달성되면 사용자의 개인정보는 관계 법령에 의한 경우가
        아니고서는 지체 없이 파기됩니다.
      </Typography>
      <Typography variant="h2">5. 개인정보 처리의 위탁</Typography>
      <Typography>
        UOSTime은 개인정보 처리업무를 위탁하고 있지 않습니다.
      </Typography>
      <Typography variant="h2">6. 개인정보의 제3자 제공</Typography>
      <Typography>
        UOSTime은 원칙적으로 법령에 따른 동의 없이는 사용자의 개인정보를
        제3자에게 제공하지 않으며, 다음의 경우는 예외로 하고 있습니다.
      </Typography>
      <ul>
        <Typography component="li">
          사전에 이용자로부터 법령에 따른 동의를 받은 경우
        </Typography>
        <Typography component="li">다른 법령의 규정에 의한 경우</Typography>
      </ul>
      <Typography variant="h2">7. 개인정보의 보호대책</Typography>
      <Typography>
        UOSTime은 사용자의 개인정보를 소중하게 여기고, 개인정보를 처리함에
        있어서 다음 조치를 하고 있습니다.
      </Typography>
      <Typography variant="h3">
        사용자의 개인정보를 암호화하고 있습니다.
      </Typography>
      <Typography>
        UOSTime은 사용자의 개인정보를 암호화된 통신구간을 이용하여 전송하고,
        비밀번호 등 중요정보는 암호화하여 보관하고 있습니다.
      </Typography>
      <Typography variant="h3">
        개인정보를 취급하는 사람을 최소화하고 있습니다.
      </Typography>
      <Typography>
        UOSTime은 사용자의 개인정보를 처리하는 직원을 최소화 하며, 개인정보보호
        의무와 보안에 대해 교육하고 있습니다.
      </Typography>
      <Typography variant="h2">
        8. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항
      </Typography>
      <Typography>
        UOSTime은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로
        불러오는 ‘쿠기(cookie)’를 사용합니다. 쿠키는 웹사이트를 운영하는데
        이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며
        이용자의 컴퓨터내에 저장되기도 합니다.
      </Typography>
      <Typography variant="h3">쿠키의 사용 목적</Typography>
      <Typography>
        이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기
        검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해
        사용됩니다.
      </Typography>
      <Typography variant="h3">쿠키의 설치/운영 및 거부</Typography>
      <Typography>
        웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을
        통해 쿠키 저장을 거부 할 수 있습니다. 쿠키 저장을 거부할 경우 서비스
        이용에 어려움이 발생할 수 있습니다.
      </Typography>
      <Typography variant="h2">9. 개인정보 보호책임자</Typography>
      <Typography>
        UOSTime을 사용하는 과정에서 개인정보보호 관련 문의, 불만, 조언이나 기타
        사항은 개인정보 보호책임자로 연락해 주시기 바랍니다. UOSTime은 신속하고
        충분한 답변을 드리도록 최선을 다하겠습니다.
      </Typography>
      <Typography variant="h3">개인정보 보호책임자</Typography>
      <ul>
        <Typography component="li">성명: 김건호</Typography>
        <Typography component="li">이메일주소: uostime@gmail.com</Typography>
      </ul>
      <Typography>
        기타 개인정보 침해에 대한 신고나 상담이 필요한 경우에 아래 기관에 문의
        가능합니다.
      </Typography>
      <ul>
        <Typography component="li">
          개인정보침해신고센터 (
          <Link href="http://privacy.kisa.or.kr">privacy.kisa.or.kr</Link> /
          국번없이 118)
        </Typography>
        <Typography component="li">
          대검찰청 사이버수사과 (
          <Link href="http://www.spo.go.kr">www.spo.go.kr</Link> / 국번없이
          1301)
        </Typography>
        <Typography component="li">
          경찰청 사이버안전국 (
          <Link href="https://ecrm.cyber.go.kr">ecrm.cyber.go.kr</Link> /
          국번없이 182)
        </Typography>
      </ul>
      <Typography variant="h2">10. 개정 전 고지 의무</Typography>
      <Typography>
        본 개인정보처리방침의 내용 변경이 있을 경우 개정 최소 7일 전에
        ‘공지사항’을 통해 사전 공지할 것입니다. 단, 수집하는 개인정보의 항목,
        이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 때에는 최소
        30일 전에 공지할 것입니다.
      </Typography>
      <ul>
        <Typography component="li">공고일자: 2020년 7월 24일</Typography>
        <Typography component="li">시행일자: 2020년 8월 1일</Typography>
      </ul>
    </Container>
  );
}
