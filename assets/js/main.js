function get_comments(commentsIdentifier)
{
    let baseUrl = $('body').data('base-url');
    $.get(baseUrl + "/comments/" + commentsIdentifier + "/retrieve", function(data) {
        $("#comments-" + commentsIdentifier).html(data);
        $('img#comments-loading-' + commentsIdentifier).hide();
    });
}

function show_hide_comment_form(commentsIdentifier)
{
    let baseUrl = $('body').data('base-url');
    $.getJSON(baseUrl + "/comments/" + commentsIdentifier + "/check", function(data) {
        if (data.success) {
            $("form#comments-form-" + commentsIdentifier).removeClass('hide');
        }
    });
}

function add_comment(commentsIdentifier, comment)
{
    let baseUrl = $('body').data('base-url');
    let data = {
        'commentsIdentifier' : commentsIdentifier,
        'comment' : comment,
    }
    $.post(baseUrl + "/comments/" + commentsIdentifier + "/add", data)
        .done(function(data) {
            if (data) {
                $("#comments-" + commentsIdentifier).html(data);
                $("form#comments-form-" + commentsIdentifier).addClass('hide');
            }
            $("form#comments-form-" + commentsIdentifier).find('input[type="submit"]').removeClass('disabled');
            $("form#comments-form-" + commentsIdentifier).find('textarea').attr('disabled', false);
            $('span#comments-' + commentsIdentifier).css('opacity', '1.0');
            $('img#comments-loading-' + commentsIdentifier).hide();
            show_hide_comment_form(commentsIdentifier);
        });
}
function delete_comment(commentsIdentifier, commentId)
{
    let baseUrl = $('body').data('base-url');
    let data = {
        'commentId' : commentId,
    }
    $.post(baseUrl + "/comments/" + commentsIdentifier + "/delete", data)
        .done(function(data) {
            $("#comments-" + commentsIdentifier).html(data);
            $("form#comments-form-" + commentsIdentifier).find('input[type="submit"]').removeClass('disabled');
            $('span#comments-' + commentsIdentifier).css('opacity', '1.0');
            $('img#comments-loading-' + commentsIdentifier).hide();
            show_hide_comment_form(commentsIdentifier);
        });
}
$(function() {
    $('.comments-form').submit(function(e) {
        $(this).find('input[type="submit"]').addClass('disabled');
        $(this).find('textarea').attr('disabled', true);
        let comment = $(this).find('textarea')[0].value;
        let commentsIdentifier = $(this).find('input.comment-identifier')[0].value;
        $('img#comments-loading-' + commentsIdentifier).show();
        $('span#comments-' + commentsIdentifier).css('opacity', '0.1');
        add_comment(commentsIdentifier, comment);
        e.preventDefault();
    });
    $(document).on('click','button.comment-delete',function(e) {
        $(this).addClass('disabled');
        let commentId = $(this).data('comment-id');
        let commentsIdentifier = $(this).data('comments-identifier');
        $('img#comments-loading-' + commentsIdentifier).show();
        $('span#comments-' + commentsIdentifier).css('opacity', '0.1');
        delete_comment(commentsIdentifier, commentId);
        e.preventDefault();
    });
});
