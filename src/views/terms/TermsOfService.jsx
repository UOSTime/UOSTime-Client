import React from 'react';
import { Container, Link, Typography } from '@material-ui/core';

export default function TermsOfService() {
  return (
    <Container>
      <Typography variant="h1">UOSTime 이용약관</Typography>
      <Typography variant="h2">제1장 총칙</Typography>
      <Typography variant="h3">제1조(목적)</Typography>
      <Typography>
        본 약관은 서울시립대학교 시간표 관리 서비스 UOSTime(
        <Link href="https://uosti.me" target="_blank">
          https://uosti.me
        </Link>
        , 이하 &quot;UOSTime&quot;)이 제공하는 서비스의 이용과 관련하여 회원과
        UOSTime 사이의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을
        목적으로 한다.
      </Typography>
      <Typography variant="h3">제2조(정의)</Typography>
      <Typography>
        이 약관에서 사용하는 용어의 정의는 다음 각 호와 같다.
      </Typography>
      <ol>
        <Typography component="li">
          &quot;서비스&quot;라 함은 구현되는 단말기(PC, 휴대형단말기 등의 각종
          유무선 장치를 포함)와 상관없이 회원이 이용할 수 있는 UOSTime 관련 제반
          서비스를 의미한다.
        </Typography>
        <Typography component="li">
          &quot;회원&quot;이라 함은 UOSTime의 서비스에 접속하여 이 약관에 따라
          UOSTime과 이용계약을 체결하고 UOSTime이 제공하는 서비스를 이용하는
          자를 의미한다.
        </Typography>
        <Typography component="li">
          &quot;계정&quot;이라 함은 UOSTime의 서비스를 이용하기 위해 UOSTime이
          회원에게 부여하는 회원 식별 단위를 의미한다.
        </Typography>
        <Typography component="li">
          &quot;아이디(ID)&quot;라 함은 회원의 식별과 서비스 이용을 위하여
          회원이 정하고 UOSTime이 승인하는 문자, 숫자, 기호의 조합을 의미한다.
        </Typography>
        <Typography component="li">
          &quot;비밀번호&quot;라 함은 회원이 부여 받은 아이디와 일치되는
          회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자, 숫자, 기호의
          조합을 의미한다.
        </Typography>
        <Typography component="li">
          &quot;게시물&quot;이라 함은 회원이 서비스를 이용함에 있어 회원이
          서비스에 게시한 문자, 문서, 그림, 음성, 링크, 파일 혹은 이들의
          조합으로 이루어진 정보 등 모든 정보나 자료를 의미한다.
        </Typography>
        <Typography component="li">
          &quot;강의&quot;라 함은 UOSTime이 제공하는 서울시립대학교 모든 강의
          정보 및 강의 식별 단위를 의미한다.
        </Typography>
        <Typography component="li">
          &quot;시간표&quot;라 함은 서비스를 통해 사용자가 생성한 학기별
          강의시간표와 그에 속한 강의의 모든 식별 가능한 정보를 포함한다.
        </Typography>
        <Typography component="li">
          &quot;강의교환&quot;이라 함은 서비스를 통해 사용자가 서로 &#39;원하는
          강의&#39;와 &#39;버리는 강의&#39;를 등록하고 UOSTime 서비스에 의해
          연결되어 대화를 나누는 서비스를 의미한다.
        </Typography>
      </ol>
      <Typography variant="h2">제2장 회원</Typography>
      <Typography variant="h3">제3조(회원의 가입)</Typography>
      <ol>
        <Typography component="li">
          회원은 UOSTime 서비스에서 본 이용약관에 동의한 후 회원가입을 요청하고
          이를 UOSTime이 승낙함으로써 이용계약을 체결하며, UOSTime으로부터
          계정을 부여받음으로써 회원으로 가입할 수 있다.
        </Typography>
        <Typography component="li">
          UOSTime은 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가
          있는 경우에는 이용신청 승낙을 유보할 수 있다.
        </Typography>
      </ol>
      <Typography variant="h3">제4조(회원에 대한 통지 및 정보제공)</Typography>
      <ol>
        <Typography component="li">
          UOSTime이 특정 혹은 불특정 회원에 대한 통지를 하는 경우 알림을
          이용한다.
        </Typography>
        <Typography component="li">
          UOSTime은 회원이 서비스 이용에 필요하다고 인정되는 다양한 정보를
          회원이 제공한 전자우편 주소로 제공할 수 있다.
        </Typography>
        <Typography component="li">
          UOSTime은 다음 각호에 해당하는 경우 회원의 동의여부와 상관없이
          전자우편으로 발송할 수 있다.
          <ul>
            <Typography component="li">
              이용 신청에서 입력한 전자우편 주소의 소유를 확인하기 위해서
              인증메일을 발송하는 경우
            </Typography>
            <Typography component="li">
              회원의 정보가 변경되어 확인하기 위해서 인증메일을 발송하는 경우
            </Typography>
            <Typography component="li">
              기타 서비스를 제공함에 있어 회원이 반드시 알아야 하는 중대한
              정보라고 UOSTime이 판단하는 경우
            </Typography>
          </ul>
        </Typography>
      </ol>
      <Typography variant="h2">제3장 서비스</Typography>
      <Typography variant="h3">제5조(서비스의 제공)</Typography>
      <Typography>UOSTime은 회원에게 아래와 같은 서비스를 제공한다.</Typography>
      <ol>
        <Typography component="li">강의 검색 및 시간표 작성 서비스</Typography>
        <Typography component="li">강의교환 매칭 서비스</Typography>
        <Typography component="li">
          기타 UOSTime이 자체 개발하거나 제3자와의 협력 계약 등을 통해
          회원들에게 제공할 일체의 서비스
        </Typography>
      </ol>
      <Typography variant="h3">제6조(서비스의 중단)</Typography>
      <ol>
        <Typography component="li">
          UOSTime은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절
          등의 경우에는 서비스의 제공을 일시적으로 중단할 수 있고, 새로운
          서비스로의 교체 및 기타 UOSTime이 적절하다고 판단하는 경우 현재
          제공되는 서비스를 완전히 중단할 수 있다.
        </Typography>
        <Typography component="li">
          제1항에 의한 서비스 중단의 경우 UOSTime은 제4조에서 정한 방법으로
          회원에게 통지한다. 단, UOSTime이 통제할 수 없는 사유로 인한 서비스의
          중단(시스템 관리자의 고의 또는 과실이 없는 디스크 장애, 시스템 다운,
          천재지변 등)으로 인하여 사전 통지가 불가능한 경우는 예외로 한다.
        </Typography>
      </ol>
      <Typography variant="h2">제4장 권리와 의무</Typography>
      <Typography variant="h3">제7조(이용자의 개인정보보호)</Typography>
      <Typography>
        UOSTime은 회원의 등록정보를 포함한 회원들의 개인정보를 보호하기 위하여
        노력한다. 회원의 개인정보보호에 관해서는 UOSTime이 별도로 정하는
        &quot;개인정보취급방침&quot;에 정한 바에 의한다.
      </Typography>
      <Typography variant="h3">제8조(UOSTime의 의무)</Typography>
      <ol>
        <Typography component="li">
          UOSTime은 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지
          않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를
          제공하기 위해서 노력한다.
        </Typography>
        <Typography component="li">
          UOSTime은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의
          개인정보(신용정보 포함) 보호를 위한 보안 시스템을 구축한다.
        </Typography>
      </ol>
      <Typography variant="h3">제9조(제휴)</Typography>
      <ol>
        <Typography component="li">
          UOSTime은 더 나은 서비스 제공을 위하여 다른 회사와 제휴할 수 있다.
        </Typography>
      </ol>
      <Typography variant="h3">
        제10조(이용자의 ID 및 비밀번호에 대한 의무)
      </Typography>
      <ol>
        <Typography component="li">
          UOSTime이 관계법령, &quot;개인정보취급방침&quot;에 의해서 그 책임을
          지는 경우를 제외하고, 자신의 ID와 비밀번호에 관한 관리책임은 각
          회원에게 있다.
        </Typography>
        <Typography component="li">
          회원은 자신의 ID 및 비밀번호를 제3자에게 제공하거나 계정을 양도해서는
          안 된다.
        </Typography>
        <Typography component="li">
          회원은 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을
          인지한 경우에는 즉시 비밀번호를 변경하고, 필요한 경우 UOSTime에
          통보하여 UOSTime이 대응하고 도움을 줄 수 있도록 해야 한다.
        </Typography>
      </ol>
      <Typography variant="h3">제11조(회원의 의무)</Typography>
      <ol>
        <Typography component="li">
          회원은 다음 각 호의 행위를 하여서는 안 된다.
          <ol>
            <Typography component="li">
              UOSTime 및 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를
              방해하는 행위
            </Typography>
            <Typography component="li">
              UOSTime의 개발자나 UOSTime 서비스의 관리자를 가장하여 글을
              게시하거나 메일을 발송하는 행위
            </Typography>
            <Typography component="li">
              컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해,
              파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드,
              파일, 프로그램을 포함하고 있는 자료를 게시하는 행위
            </Typography>
            <Typography component="li">
              다른 이용자에 대한 개인정보를 동의 없이 수집, 저장, 공개하는 행위
            </Typography>
            <Typography component="li">
              UOSTime의 서비스를 이용하여 영리목적의 활동을 하는 행위
            </Typography>
            <Typography component="li">
              기타 UOSTime이 제공하는 서비스에 정한 약관을 위반하는 행위
            </Typography>
          </ol>
        </Typography>
        <Typography component="li">
          제1항에 해당하는 행위를 한 회원이 있을 경우 UOSTime은 회원의 서비스
          이용을 제한, 정지 또는 상실시킬 수 있다.
        </Typography>
      </ol>
      <Typography variant="h3">제12조(게시물의 권리와 책임)</Typography>
      <ol>
        <Typography component="li">
          서비스에 대한 저작권 및 지적재산권은 UOSTime에 귀속된다.
        </Typography>
        <Typography component="li">
          회원이 서비스 내에 게시한 게시물 및 시간표의 저작권은 해당 게시물 및
          시간표의 저작자에게 귀속된다.
        </Typography>
        <Typography component="li">
          회원은 UOSTime을 이용함으로써 얻은 정보를 UOSTime의 사전승낙 없이
          복제, 전송, 출판, 배포, 방송, 기타 방법에 의하여 영리목적으로
          이용하거나 제3자에게 이용하게 하여서는 안된다.
        </Typography>
        <Typography component="li">
          회원은 자신이 서비스 내에 게시한 게시물 및 시간표를 UOSTime이 다음과
          같은 목적으로 사용하는 것을 허락한다.
          <ul>
            <Typography component="li">
              회원의 편의를 목적으로 게시물 및 시간표를 이미지 형태로 변환하는
              것
            </Typography>
            <Typography component="li">
              회원이 허용하는 다른 회원에게 시간표를 공개하는 것
            </Typography>
            <Typography component="li">
              회원이 직접 요청한 경우 제3자 서비스에 제공하는 것
            </Typography>
            <Typography component="li">
              비영리적 목적으로 시간표를 개인 식별이 불가능한 형태로 가공, 공개
              및 이용하는 것
            </Typography>
          </ul>
        </Typography>
      </ol>
      <Typography variant="h2">제5장 약관의 개정과 분쟁의 조정</Typography>
      <Typography variant="h3">제13조(약관의 개정)</Typography>
      <ol>
        <Typography component="li">
          UOSTime은 「약관의 규제 등에 관한 법률」, 「정보통신망이용촉진 등에
          관한 법률」 등 관련 법률을 위배하지 않는 범위에서 본 약관을 개정할 수
          있다.
        </Typography>
        <Typography component="li">
          UOSTime이 본 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
          현행약관과 함께 제4조에서 정한 방법으로 그 적용일자 7일 이전에
          공지한다.
        </Typography>
        <Typography component="li">
          회원은 변경된 약관에 대해 변경된 약관이 공지 된 때로부터 15일까지
          거부할 권리가 있다. 이 경우 UOSTime은 당해 회원과의 계약을 해지할 수
          있다. 변경된 약관이 공지된 후 15일 이내에 거부의사를 표시하지 않는
          회원은 당해 약관 개정에 동의하는 것으로 간주한다.
        </Typography>
      </ol>
      <Typography variant="h3">제14조(면책조항)</Typography>
      <ol>
        <Typography component="li">
          다음과 같은 사유가 있을 경우 UOSTime은 책임을 면제받을 수 있다.
          <ol>
            <Typography component="li">
              UOSTime은 천재 지변, 전쟁 및 기타 이에 준하는 불가항력으로 인하여
              서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이
              면제된다.
            </Typography>
            <Typography component="li">
              UOSTime은 기간통신 사업자가 전기통신 서비스를 중지하거나
              정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제된다.
            </Typography>
            <Typography component="li">
              UOSTime은 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한
              사유로 발생한 손해에 대한 책임이 면제된다.
            </Typography>
            <Typography component="li">
              UOSTime은 회원의 귀책 사유로 인한 서비스 이용의 장애 또는 손해에
              대하여 책임을 지지 않는다.
            </Typography>
            <Typography component="li">
              UOSTime은 회원의 컴퓨터 오류에 의해 손해가 발생한 경우, 또는
              회원이 개인정보를 부정확하게 기재하여 손해가 발생한 경우 책임을
              지지 않는다.
            </Typography>
            <Typography component="li">
              UOSTime은 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에
              대하여 책임을 지지 않는다.
            </Typography>
            <Typography component="li">
              UOSTime은 회원에게 무료로 제공하는 서비스의 이용과 관련해서는
              어떠한 손해도 책임을 지지 않는다.
            </Typography>
          </ol>
        </Typography>
      </ol>
      <Typography variant="h3">제15조(준거법 및 재판관할)</Typography>
      <Typography>
        UOSTime과 이용자 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국
        법을 적용하며, 본 분쟁으로 인한 소는 민사소송법상의 관할을 가지는
        대한민국의 법원에 제기한다.
      </Typography>
    </Container>
  );
}
