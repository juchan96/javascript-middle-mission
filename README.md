# javascript-middle-mission
## [레벨2 중간 추가 미션](https://nextstep.camp/courses/-Kv05nt2H14q-C4t92uz/-KvSbAd9YMrVFFDABQg7/lessons)
## 폴더 설명
- 간단한 데이터 조작 : simple-data-handle/
- 중첩된 JSON 데이터 조작 : json-data-handle/
- 자판기 애플리케이션 : vending-machine-app
- 자바스크립트의 이해 : understanding-javascript
## 의문점
- simple-data-handle/simple-data-handle.js에서
	- (37줄)getNumberTypeElements(elements) 함수의 동작이 두 가지인 것 같은데, 함수를 두 개로 나눌 수는 없을지 궁금합니다.
	- (41줄)그리고 아래의 예시2처럼 코드를 한 줄로 만들었다가 예시 1처럼 나눴는데 앞의 방법과 뒤의 방법 중 무엇이 더 좋은지, 이럴 때 판단 기준으로는 무엇을 고려해야 하는지 궁금합니다.
		- 예시1
		~~~
		newElements = getNumberTypeElements(elements[element]);
		numberTypeElements = numberTypeElements.concat(newElements);
		~~~
		- 예시2
		~~~
		numberTypeElements = numberTypeElements.concat(getNumberTypeElements(elements[element]);
		~~~
