/**
 * Created by austin on 12/10/2016.
 */

//counts down character in textbox
function CharacterCount(count,output) {
  //while (output > 0) {
    //semantic ui form textbox seems to require 29 extra characters to countdown from 140
    //might be browser related
    let countdown = 169 - document.getElementById(count).value.length;
    document.getElementById(output).innerHTML = countdown;
    console.log(countdown);
}