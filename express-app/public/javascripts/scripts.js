$(document).ready(function() {
	$("#btnAddMessage").on("click", function() {

		var message = {
			id: $("#txtId").val(),
			subject: $("#txtSubject").val(),
			description: $("#txtDescription").val()
		}

		$.ajax({
				method: "POST",
				url: "http://localhost:8080/messages",
				data: message
			})
			.done(function(msg) {
				alert("Data Saved: " + msg);
			});
	});
});