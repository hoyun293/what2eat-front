import React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { connect } from '../redux/redux-connect'

interface IOwnProps {}
interface IStateProps {}
interface IDispatchProps {}

const Privacy: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({}) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='px-container'>
          <h1>개인정보 처리 방침</h1>
          <p>
            <strong>1. 개인정보의 처리 목적</strong> "What2Eat"(‘https://what2eat.me’이하 ‘What2Eat’) 은(는)
            다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다. -
            고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별.인증, 회원자격 유지.관리, 물품 또는
            서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급.배송 등
            <br />
            <br />
            <strong>2. 개인정보의 처리 및 보유 기간</strong>
            <br />
            <br />① "What2Eat"(‘https://what2eat.me’이하 ‘What2Eat’) 은(는) 정보주체로부터 개인정보를 수집할
            때 동의 받은 개인정보 보유․이용기간 또는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를
            처리․보유합니다.
            <br />
            <br />② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
            <br />- 투표정보 : 앱 삭제시까지. (회원가입이 존재하지 않기 때문에 앱이나, 쿠키를 삭제하면 해당
            정보는 비식별 정보가 됩니다.)
            <br />
            <br />
            <p className='lh6 bs4'>
              <strong>
                3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은
                권리를 행사할 수 있습니다.
              </strong>
            </p>
            <p className='ls2'>
              ① 정보주체는 What2Eat(‘https://what2eat.me’이하 ‘What2Eat) 에 대해 언제든지 다음 각 호의
              개인정보 보호 관련 권리를 행사할 수 있습니다.
              <br />
              1. 개인정보 열람요구
              <br /> 2. 오류 등이 있을 경우 정정 요구
              <br /> 3. 삭제요구
              <br /> 4. 처리정지 요구
            </p>
            <br />
            <br />
            <p className='lh6 bs4'>
              <strong>4. 처리하는 개인정보의 항목 작성 </strong>
              <br />
              <br /> ① <em className='emphasis'>"What2Eat"('https://what2eat.me'이하 'What2Eat')</em>은(는)
              다음의 개인정보 항목을 처리하고 있습니다.
              <br /> - 투표지(사용자 비식별)
              <br /> - 투표정보(사용자 비식별)
            </p>
            <br />
            <br />
            <p className='lh6 bs4'>
              <strong>
                5. 개인정보의 파기<em className='emphasis'>"What2Eat"('What2Eat')</em>은(는) 원칙적으로
                개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및
                방법은 다음과 같습니다.
              </strong>
            </p>
            <p className='ls2'>
              -파기절차
              <br />
              앱 삭제 또는 쿠키 삭제시에, 즉시 사용자의 데이터는 비식별 정보가 됩니다. DB에 사용자의 데이터가
              있지만 어떤 사용자의 데이터인지는 아무도 알 수 없습니다.
              <br />
              <br />
              -파기기한
              <br />
              쿠키 또는 앱 삭제 즉시
            </p>
            <p className='ls2'></p>
            <br />
            <br />
            <p className='lh6 bs4'>
              <strong>6. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항</strong>
            </p>
            <p className='ls2'>
              ① What2Eat 은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는
              ‘쿠기(cookie)’를 사용합니다.
              <br /> ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는
              소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 :
              이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부,
              등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. 나. 쿠키의 설치•운영 및 거부 :
              웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수
              있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
              <br />
              <br />
              <p className='lh6 bs4'>
                <strong>7. 개인정보 보호책임자 작성 </strong>
              </p>
              <br /> ① What2Eat(‘https://what2eat.me’이하 ‘What2Eat) 은(는) 개인정보 처리에 관한 업무를
              총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
              <p className='ls2'>
                <br />▶ 개인정보 보호책임자
                <br />
                성명 : 남준호
                <br />
                연락처 : skout90@naver.com
                <br />
                <br />② 정보주체께서는 What2Eat(‘https://what2eat.me’이하 ‘What2Eat) 의 서비스(또는 사업)을
                이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
                보호책임자 및 담당부서로 문의하실 수 있습니다. What2Eat(‘https://what2eat.me’이하 ‘What2Eat)
                은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
              </p>
              <br />
              <br />
              <p className='lh6 bs4'>
                <strong>8. 개인정보 처리방침 변경 </strong>
              </p>
              <p>
                ①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및
                정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
              <br />
              <br />
              <p className='lh6 bs4'>
                <strong>
                  9. 개인정보의 안전성 확보 조치 <em className='emphasis'>"What2Eat"('What2Eat')</em>은(는)
                  개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를
                  하고 있습니다.
                </strong>
              </p>
              <p className='ls2'>
                1. 사용자 데이터 비식별화
                <br /> 회원가입이 존재하지 않고, 저장한 데이터는 어느 회원의 데이터인지 알 수 없습니다.
                <br />
                <br />
              </p>
            </p>
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({}) => ({}),
  mapDispatchToProps: {},
  component: Privacy
})
