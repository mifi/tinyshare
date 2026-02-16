/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.5.1
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license MIT
 *
 */

export type SharerName =
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'x'
  | 'threads'
  | 'bluesky'
  | 'email'
  | 'whatsapp'
  | 'telegram'
  | 'viber'
  | 'line'
  | 'pinterest'
  | 'tumblr'
  | 'hackernews'
  | 'reddit'
  | 'vk'
  | 'xing'
  | 'buffer'
  | 'instapaper'
  | 'pocket'
  | 'mashable'
  | 'mix'
  | 'flipboard'
  | 'weibo'
  | 'blogger'
  | 'baidu'
  | 'douban'
  | 'okru'
  | 'mailru'
  | 'evernote'
  | 'skype'
  | 'delicious'
  | 'sms'
  | 'trello'
  | 'messenger'
  | 'odnoklassniki'
  | 'meneame'
  | 'diaspora'
  | 'googlebookmarks'
  | 'qzone'
  | 'refind'
  | 'surfingbird'
  | 'yahoomail'
  | 'wordpress'
  | 'amazon'
  | 'pinboard'
  | 'threema'
  | 'kakaostory'
  | 'yummly';

interface PopupOptions {
  width?: number;
  height?: number;
}

interface BaseShareOptions {
  onWindowClose?: () => void;
  title?: string;
  url?: string;
  link?: boolean;
  blank?: boolean;
  popup?: PopupOptions;
}

interface ShareOptionsBySharer {
  facebook: BaseShareOptions & { hashtag?: string; quote?: string };
  linkedin: BaseShareOptions;
  twitter: BaseShareOptions & {
    hashtags?: string;
    via?: string;
    related?: string;
    in_reply_to?: string;
  };
  x: BaseShareOptions & {
    hashtags?: string;
    via?: string;
    related?: string;
    in_reply_to?: string;
  };
  threads: BaseShareOptions;
  bluesky: BaseShareOptions;
  email: BaseShareOptions & { to?: string; subject?: string };
  whatsapp: BaseShareOptions & { web?: boolean; to?: string };
  telegram: BaseShareOptions;
  viber: BaseShareOptions;
  line: BaseShareOptions;
  pinterest: BaseShareOptions & { image?: string; description?: string };
  tumblr: BaseShareOptions & { caption?: string; tags?: string };
  hackernews: BaseShareOptions;
  reddit: BaseShareOptions;
  vk: BaseShareOptions & { caption?: string; image?: string };
  xing: BaseShareOptions;
  buffer: BaseShareOptions & { via?: string; picture?: string };
  instapaper: BaseShareOptions & { description?: string };
  pocket: BaseShareOptions;
  mashable: BaseShareOptions;
  mix: BaseShareOptions;
  flipboard: BaseShareOptions;
  weibo: BaseShareOptions & { image?: string; appkey?: string; ralateuid?: string };
  blogger: BaseShareOptions & { description?: string };
  baidu: BaseShareOptions;
  douban: BaseShareOptions & { name?: string; image?: string; description?: string };
  okru: BaseShareOptions;
  mailru: BaseShareOptions & { description?: string };
  evernote: BaseShareOptions;
  skype: BaseShareOptions;
  delicious: BaseShareOptions;
  sms: BaseShareOptions & { body?: string };
  trello: BaseShareOptions & { description?: string };
  messenger: BaseShareOptions;
  odnoklassniki: BaseShareOptions;
  meneame: BaseShareOptions;
  diaspora: BaseShareOptions;
  googlebookmarks: BaseShareOptions;
  qzone: BaseShareOptions;
  refind: BaseShareOptions;
  surfingbird: BaseShareOptions & { description?: string };
  yahoomail: BaseShareOptions & { to?: string; subject?: string; body?: string };
  wordpress: BaseShareOptions;
  amazon: BaseShareOptions;
  pinboard: BaseShareOptions & { description?: string };
  threema: BaseShareOptions & { text?: string; id?: string };
  kakaostory: BaseShareOptions;
  yummly: BaseShareOptions;
};

type ShareOptionsFor<S extends SharerName> = ShareOptionsBySharer[S];

interface SharerConfig {
  shareUrl: string;
  params?: Record<string, string | number | boolean | undefined>;
  width?: number;
  height?: number;
  inline?: boolean;
}

const normalizeHashtag = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  if (value.startsWith('#')) {
    return value;
  }
  return `#${value}`;
};

const sharerBuilders = {
  facebook: (options: ShareOptionsFor<'facebook'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.facebook.com/sharer/sharer.php',
      params: {
        u: url,
        hashtag: normalizeHashtag(options.hashtag),
        quote: options.quote,
      },
    };
  },
  linkedin: (options: ShareOptionsFor<'linkedin'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.linkedin.com/shareArticle',
      params: {
        url,
        mini: true,
      },
    };
  },
  twitter: (options: ShareOptionsFor<'twitter'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://twitter.com/intent/tweet',
      params: {
        text: title,
        url,
        hashtags: options.hashtags,
        via: options.via,
        related: options.related,
        in_reply_to: options.in_reply_to,
      },
    };
  },
  x: (options: ShareOptionsFor<'x'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://x.com/intent/tweet',
      params: {
        text: title,
        url,
        hashtags: options.hashtags,
        via: options.via,
        related: options.related,
        in_reply_to: options.in_reply_to,
      },
    };
  },
  threads: (options: ShareOptionsFor<'threads'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://threads.net/intent/post',
      params: {
        text: `${title} ${url}`.trim(),
      },
    };
  },
  bluesky: (options: ShareOptionsFor<'bluesky'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://bsky.app/intent/compose',
      params: {
        text: `${title} ${url}`.trim(),
      },
    };
  },
  email: (options: ShareOptionsFor<'email'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: `mailto:${options.to ?? ''}`,
      params: {
        subject: options.subject,
        body: `${title}\n${url}`.trim(),
      },
    };
  },
  whatsapp: (options: ShareOptionsFor<'whatsapp'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: options.web ? 'https://web.whatsapp.com/send' : 'https://wa.me/',
      params: {
        phone: options.to,
        text: `${title} ${url}`.trim(),
      },
    };
  },
  telegram: (options: ShareOptionsFor<'telegram'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://t.me/share',
      params: {
        text: title,
        url,
      },
    };
  },
  viber: (options: ShareOptionsFor<'viber'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'viber://forward',
      params: {
        text: `${title} ${url}`.trim(),
      },
    };
  },
  line: (options: ShareOptionsFor<'line'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: `http://line.me/R/msg/text/?${encodeURIComponent(`${title} ${url}`.trim())}`,
    };
  },
  pinterest: (options: ShareOptionsFor<'pinterest'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.pinterest.com/pin/create/button/',
      params: {
        url,
        media: options.image,
        description: options.description,
      },
    };
  },
  tumblr: (options: ShareOptionsFor<'tumblr'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'http://tumblr.com/widgets/share/tool',
      params: {
        canonicalUrl: url,
        content: url,
        posttype: 'link',
        title,
        caption: options.caption,
        tags: options.tags,
      },
    };
  },
  hackernews: (options: ShareOptionsFor<'hackernews'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://news.ycombinator.com/submitlink',
      params: {
        u: url,
        t: title,
      },
    };
  },
  reddit: (options: ShareOptionsFor<'reddit'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.reddit.com/submit',
      params: {
        url,
        title,
      },
    };
  },
  vk: (options: ShareOptionsFor<'vk'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'http://vk.com/share.php',
      params: {
        url,
        title,
        description: options.caption,
        image: options.image,
      },
    };
  },
  xing: (options: ShareOptionsFor<'xing'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.xing.com/social/share/spi',
      params: {
        url,
      },
    };
  },
  buffer: (options: ShareOptionsFor<'buffer'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://buffer.com/add',
      params: {
        url,
        title,
        via: options.via,
        picture: options.picture,
      },
    };
  },
  instapaper: (options: ShareOptionsFor<'instapaper'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'http://www.instapaper.com/edit',
      params: {
        url,
        title,
        description: options.description,
      },
    };
  },
  pocket: (options: ShareOptionsFor<'pocket'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://getpocket.com/save',
      params: {
        url,
      },
    };
  },
  mashable: (options: ShareOptionsFor<'mashable'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://mashable.com/submit',
      params: {
        url,
        title,
      },
    };
  },
  mix: (options: ShareOptionsFor<'mix'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://mix.com/add',
      params: {
        url,
      },
    };
  },
  flipboard: (options: ShareOptionsFor<'flipboard'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://share.flipboard.com/bookmarklet/popout',
      params: {
        v: 2,
        title,
        url,
        t: Date.now(),
      },
    };
  },
  weibo: (options: ShareOptionsFor<'weibo'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'http://service.weibo.com/share/share.php',
      params: {
        url,
        title,
        pic: options.image,
        appkey: options.appkey,
        ralateUid: options.ralateuid,
        language: 'zh_cn',
      },
    };
  },
  blogger: (options: ShareOptionsFor<'blogger'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.blogger.com/blog-this.g',
      params: {
        u: url,
        n: title,
        t: options.description,
      },
    };
  },
  baidu: (options: ShareOptionsFor<'baidu'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'http://cang.baidu.com/do/add',
      params: {
        it: title,
        iu: url,
      },
    };
  },
  douban: (options: ShareOptionsFor<'douban'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.douban.com/share/service',
      params: {
        name: options.name,
        href: url,
        image: options.image,
        comment: options.description,
      },
    };
  },
  okru: (options: ShareOptionsFor<'okru'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://connect.ok.ru/dk',
      params: {
        'st.cmd': 'WidgetSharePreview',
        'st.shareUrl': url,
        title,
      },
    };
  },
  mailru: (options: ShareOptionsFor<'mailru'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'http://connect.mail.ru/share',
      params: {
        share_url: url,
        linkname: title,
        linknote: options.description,
        type: 'page',
      },
    };
  },
  evernote: (options: ShareOptionsFor<'evernote'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.evernote.com/clip.action',
      params: {
        url,
        title,
      },
    };
  },
  skype: (options: ShareOptionsFor<'skype'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://web.skype.com/share',
      params: {
        url,
        title,
      },
    };
  },
  delicious: (options: ShareOptionsFor<'delicious'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://del.icio.us/post',
      params: {
        url,
        title,
      },
    };
  },
  sms: (options: ShareOptionsFor<'sms'>): SharerConfig => ({
    shareUrl: 'sms://',
    params: {
      body: options.body,
    },
  }),
  trello: (options: ShareOptionsFor<'trello'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://trello.com/add-card',
      params: {
        url,
        name: title,
        desc: options.description,
        mode: 'popup',
      },
    };
  },
  messenger: (options: ShareOptionsFor<'messenger'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'fb-messenger://share',
      params: {
        link: url,
      },
    };
  },
  odnoklassniki: (options: ShareOptionsFor<'odnoklassniki'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://connect.ok.ru/dk',
      params: {
        'st.cmd': 'WidgetSharePreview',
        'st.deprecated': 1,
        'st.shareUrl': url,
      },
    };
  },
  meneame: (options: ShareOptionsFor<'meneame'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.meneame.net/submit',
      params: {
        url,
      },
    };
  },
  diaspora: (options: ShareOptionsFor<'diaspora'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://share.diasporafoundation.org',
      params: {
        title,
        url,
      },
    };
  },
  googlebookmarks: (options: ShareOptionsFor<'googlebookmarks'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.google.com/bookmarks/mark',
      params: {
        op: 'edit',
        bkmk: url,
        title,
      },
    };
  },
  qzone: (options: ShareOptionsFor<'qzone'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
      params: {
        url,
      },
    };
  },
  refind: (options: ShareOptionsFor<'refind'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://refind.com',
      params: {
        url,
      },
    };
  },
  surfingbird: (options: ShareOptionsFor<'surfingbird'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://surfingbird.ru/share',
      params: {
        url,
        title,
        description: options.description,
      },
    };
  },
  yahoomail: (options: ShareOptionsFor<'yahoomail'>): SharerConfig => ({
    shareUrl: 'http://compose.mail.yahoo.com',
    params: {
      to: options.to,
      subject: options.subject,
      body: options.body,
    },
  }),
  wordpress: (options: ShareOptionsFor<'wordpress'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://wordpress.com/wp-admin/press-this.php',
      params: {
        u: url,
        t: title,
        s: title,
      },
    };
  },
  amazon: (options: ShareOptionsFor<'amazon'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://www.amazon.com/gp/wishlist/static-add',
      params: {
        u: url,
        t: title,
      },
    };
  },
  pinboard: (options: ShareOptionsFor<'pinboard'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'https://pinboard.in/add',
      params: {
        url,
        title,
        description: options.description,
      },
    };
  },
  threema: (options: ShareOptionsFor<'threema'>): SharerConfig => ({
    shareUrl: 'threema://compose',
    params: {
      text: options.text,
      id: options.id,
    },
  }),
  kakaostory: (options: ShareOptionsFor<'kakaostory'>): SharerConfig => {
    const url = options.url ?? '';
    return {
      shareUrl: 'https://story.kakao.com/share',
      params: {
        url,
      },
    };
  },
  yummly: (options: ShareOptionsFor<'yummly'>): SharerConfig => {
    const title = options.title ?? '';
    const url = options.url ?? '';
    return {
      shareUrl: 'http://www.yummly.com/urb/verify',
      params: {
        url,
        title,
        yumtype: 'button',
      },
    };
  },
} satisfies { [S in SharerName]: (options: ShareOptionsFor<S>) => SharerConfig };

const buildSharerConfig = <S extends SharerName>(
  sharer: S,
  options: ShareOptionsFor<S>,
): SharerConfig | undefined => {
  const config = sharerBuilders[sharer](options as ShareOptionsFor<SharerName>);

  if (options.popup?.width) {
    config.width = options.popup.width;
  }
  if (options.popup?.height) {
    config.height = options.popup.height;
  }

  return config;
};

const buildShareUrl = (config: SharerConfig): string => {
  const params = config.params ?? {};
  const keys = Object.keys(params);
  if (keys.length === 0) {
    return config.shareUrl;
  }

  const query = keys
    .filter((key) => params[key] !== undefined && params[key] !== '')
    .map((key) => `${key}=${encodeURIComponent(String(params[key]))}`)
    .join('&');

  return query ? `${config.shareUrl}?${query}` : config.shareUrl;
};

const openPopup = (shareUrl: string, width = 600, height = 480): Window | null => {
  const left = window.innerWidth / 2 - width / 2 + window.screenX;
  const top = window.innerHeight / 2 - height / 2 + window.screenY;
  const popParams = `scrollbars=no, width=${width}, height=${height}, top=${top}, left=${left}`;
  const newWindow = window.open(shareUrl, '', popParams);

  newWindow?.focus();

  return newWindow;
};

export const share = <S extends SharerName>(
  url: string,
  sharer: S,
  options: Omit<ShareOptionsFor<S>, 'url'>,
): string | false => {
  const merged: ShareOptionsFor<S> = {
    ...options,
    url,
  };

  const config = buildSharerConfig(sharer, merged);
  if (!config) {
    return false;
  }

  const shareUrl = buildShareUrl(config);

  if (options.link) {
    if (options.blank) {
      const win = window.open(shareUrl, '_blank');
      if (options.onWindowClose) win?.addEventListener('close', options.onWindowClose, { once: true });
    } else {
      window.location.href = shareUrl;
    }
    return shareUrl;
  }

  openPopup(shareUrl, config.width ?? 600, config.height ?? 480);
  return shareUrl;
};

export default share;
