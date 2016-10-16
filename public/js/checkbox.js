/**
 * Created by austin on 15/10/2016.
 */
$('.ui.checkbox')
    .checkbox()
;

// Listen for click on toggle checkbox
$('#selectAll').click(function(event) {
  if(this.checked) {
    $(':checkbox').each(function() {
      this.checked = true;
    });
  }
});