function add(a, b) {
    try {
        let answer = Number(a) + Number(b);

        if(Number.isNaN(answer)) {
            throw "please provide valid numbers";
        }

        return answer;

    } catch(e) {

        return e;

    }
}

function subtract(){

}

module.exports = {add, subtract};