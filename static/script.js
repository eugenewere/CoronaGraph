function $(s) {
    alert('helloo');

    $(document).ready(function() {
        alert('hell');

        $("#false").click(function(){
            alert('heloo');
            $(".target").toggle(false);
        });

        $("#true").click(function(){
            $(".target").toggle(true);
        });

    });
}