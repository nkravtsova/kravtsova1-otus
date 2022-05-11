const { JSDOM } = require("jsdom");
const getPath = require("./getPath");


const dom = new JSDOM(`<!DOCTYPE html>
	<body>
		<div class="divclass red">
			<ul> List
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li id="elem">4</li>
				<li>5</li>
				
			</ul>
		</div>
		
		<div class="divclass red">
			<ul> List1
				<li>6</li>
				<li>7</li>
				<li id="elem1">8</li>
				<li>9</li>
				<li>10</li>
				
			</ul>
		</div>
	</body>`);

const findEl = document.querySelector("#elem"); 



describe("getPath should works", () => {

  it("getPath should return string", () => {

   expect(typeof(getPath(findEl))).toBe('string');

  });
  it("querySelectorAll for getPath should return 1 item", function() {

	expect(Array.from(document.querySelectorAll(getPath(findEl))).length).toBe(1);

  });


});
