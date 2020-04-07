$(function () {
  // Figure captions
  $('main > p > img').each(function () {
    const caption = $(this).attr('title');
    if (caption) $(this).after('<figcaption class="figure-caption">' + caption + '</figcaption>');
  });

  // Anchors
  $('h1, h2, h3, h4, h5, h6').each(function () {
    $(this).html($(this).html() + '<a class="anchor" href="#' + $(this).attr('id') + '"><i class="fas fa-link"></i></a>');
  });

  // Code lines anchors
  $('.lineno').each(function (codeIndex) {
    $(this).html($(this).html().replace(/(\d+)/g, function (lineIndex) {
      const anchor = `code-${codeIndex}:${lineIndex}`;
      return `<a id="${anchor}" href="#${anchor}">${lineIndex}</a>`;
    }));
  });
  // $(window.location.hash).scrollIntoView();

  // Shell prompt
  $(`.language-shell .lineno a`).each(function () { $(this).text('$') });

  // Post dates
  // moment.locale('ru');
  // $('.post-time').each(function () {
  //   $(this).html(moment($(this).attr('data-post-date'), "YYYY-MM-DD HH:mm:ss Z").calendar().replace(',', ''));
  // });

  // External links
  $('a').each(function () {
    if (!$(this).attr('href')) return;
    if (($(this)[0].protocol !== location.protocol ||
        $(this)[0].host !== location.host) &&
        $(this)[0].protocol !== 'javascript:') {
      $(this).attr('target', '_blank')
          .attr('rel', 'noopener noreferrer')
          .html($(this).html() + '&nbsp;<i class="fas fa-external-link-alt"></i>');
    }
  });

  // Render boundary whitespaces
  $('.highlight td.code pre').each(function () {
    $(this).html($(this).html().replace(/ {2,}| +$|^ +/gm, function (spaces) {
      return '<span class="bw"> </span>'.repeat(spaces.length);
    }));
    $(this).html($(this).html().replace(/\t/g, '<span class="bwt">\t</span>'))
  });
});

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() { // TODO: add classes on load
  $('pre').each((_, element) => {
    if (element.clientWidth < element.scrollWidth) {
      $(element).addClass('overflowed');
    }
    else {
      $(element).removeClass('overflowed');
    }
  })
}

// Broken images
$('img').on('error', function () {
  $(this).addClass('text-muted');
  $(this).attr('alt', function (i, alt) {
    return alt ? ' ' + alt : '';
  });
});

// Ordered lists padding
// $('ol').each(function () {
//   const lastIndex = $(this).children().length + $(this).attr('start');
//   if (!isNaN(lastIndex))
//     $(this).css({'padding-left': .5 + .625 * Math.floor(Math.log10(lastIndex)) + 'em'});
// });

let generatedUids = {};

function generateUid(length) {
  while (true) {
    let uid = (Math.abs(Math.random()) * Math.pow(36, length)).toString(36).split('.')[0];
    uid = '0'.repeat(length - uid.length) + uid;
    if (!generatedUids.hasOwnProperty(uid)) {
      generatedUids[uid] = true;
      return uid;
    }
  }
}

async function listTest() {
  for (let i = 0; i < 8; i++) {
    $('ol').each(function () {
      $(this).append(`<li><code>${generateUid(4)}</code> <code>${generateUid(4)}</code> <code>${generateUid(4)}</code> <code>${generateUid(4)}</code></li>`);
      let lastIndex = (Number($(this).attr('start')) - 1 || 0) +
                      (Number($(this).children().length) || 0);
      if (!isNaN(lastIndex))
        $(this).css({'padding-left': `${1.125 + .625 * Math.floor(Math.log10(lastIndex))}em`});
    });
  }

  // Tables
  $('main > table').each(function () {
    $(this).addClass('table table-dark table-bordered table-striped table-hover table-sm');
  });
}

listTest();

// let scrollTopOld = 0;
// $('figure.highlight > pre, pre.highlight').on('scroll', function () {
//   const scrollTop = $(this).scrollTop();
//   const scrollDelta = scrollTop - scrollTopOld;
//   $(this).find('.copy-button').css('top', '+=' + scrollDelta);
//   scrollTopOld = scrollTop;
// });

// function copy(button) {
//   const code = $(button).parent().find(($(button).parent().find('.gutter').length !== 0 ? 'td.' : '') + 'code');
//   console.log(code);
//   const temp = $('<div>');
//   $('body').append(temp);
//   temp.attr('contenteditable', true)
//       .html(code.html()).select()
//       .on('focus', function () {
//         document.execCommand('selectAll', false, null);
//       })
//       .focus();
//   document.execCommand('copy');
//   temp.remove();
// }
