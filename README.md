# 2021 제1회 CJ 미래기술 챌린지
### E-풀필먼트 프로세스에 따른 주문 시간, 거리, 상품별 Dynamic Pricing 모델 개발 및 웹 구현

#### 일정
1. 참가신청 : 2021.09.17까지
2. 데이터 제공 : 2021.10.1
3. 과제 수행 : 2021.10.02. ~ 2021.10.29.
4. 1차 결과 발표 : 2021.11.05.
5. 온라인 Presentation : 2021.11.11. ~ 2021.11.12.
6. 최종 결과 발표 : 2021.11.16.
7. 시상식 : 2021.11.26.

#### 결과
우수상 (상금 : 400만 원)

#### 배경 및 필요성
* E-풀필먼트 프로세스에 맞는 유동적인 배송 비용 가격 책정 필요
* 데이터 시각화를 통해 Dynamic Pricing 모델의 요인 분석

#### 목적
배송 비용 책정 프로세스 및 주문량 예측 모델을 통해 고객사와 소비자 모두 합리적인 배송 비용 책정

#### 개발환경
* 인공지능 모델
  * Python 3.8
  * Tensorflow 2.4
* Back-end
  * Flask 2.0.2
  * redis 3.2.100
* Front-end
  * React 17.0.2
  * Node.js 14.18.1

#### 데이터
* 제공 데이터
  * 주문 시간, 거리, 상품에 필요한 요소들 확인
* 외부 데이터
  * CJ HUB터미널, SUB터미널의 위도 / 경도 확인
  * 고가 택배 할증 요금 기준 확인

#### 시스템 구현
* 배송 비용 책정 규칙 정의
  * 기업 : 입고 작업비 ~ 포장재
  * 개인 : 배송방식 ~ 출고 작업비
* 정밀한 책정을 위한 가격 조정 및 보정된 거리값 적용
* 주문량 예측 모델
  * 시계열 예측 분야에서 좋은 성능을 보이는 LSTM 모델 사용

#### 결론
```
주문량 예측 모델을 통하여 주문량이 적을 것으로 예상되는 시간에 배송 비용 할인 적용 및 추천
1시간 단위로 실시간 주문량 예측, redis에 실시간으로 주문량 카운트, 조회, 예측 데이터로 활용
```
