/**
 * highlight.js ASN.1 syntax highlighting definition
 *
 * @see https://github.com/fillabs/highlightjs-asn1
 *
 * @package: highlightjs-asn1
 * @author:  Denis Filatov <denis.filatov(at)fillabs.com>
 * @since:   2019-08-05
 */

export default function (hljs) {

  const INTEGER_RE = /-?\b(?:0|[1-9]\d*)\b/;
  const REAL_RE = /-?\b(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*))?(?:[eE][-+]?\d+)?\b/;
  const BITSTRING_RE = /'[01]+'B/
  const OCTETSTRING_RE = /'[0-9A-Fa-f]+'H/
  const ASN_TYPE_RE = /[^-]\b[A-Z][\w-]*\b/

  const ASN_DOCUMENTATION_MODE_OPTIONS = {
    scope: 'meta',
    keywords: {
      $pattern: /@?\w[\w-]*/,
      doctag: '@brief'  
    },
    contains: [
      {
        begin: '@options', end: '$',
        beginScope: 'doctag',
        keywords: {
          $pattern: /@?\w[\w-]*/,
          built_in: 'no-auto-fields no-auto-values no-fields-header force-all-fields brief-as-title'
        }
      },{
        begin: [
          /@(?:class|struct|param|field)/,
          /\s+/,
          /\w[\w-]*/
        ],
        beginScope: {
          1: 'doctag',
          3: 'built_in'
        }
      }
    ]
  };
  const ASN_DOCUMENTATION_BLOCK_COMMENTS  = hljs.COMMENT('/\\*\\*', '\\*/', ASN_DOCUMENTATION_MODE_OPTIONS);
  const ASN_DOCUMENTATION_LINE_COMMENTS   = hljs.COMMENT('--[*!$<]', '--|$', ASN_DOCUMENTATION_MODE_OPTIONS);
  
  const ASN_LINE_COMMENTS  = hljs.COMMENT('--', '$|--');
  const ASN_BLOCK_COMMENTS = hljs.C_BLOCK_COMMENT_MODE;

  
  const ASN_TYPES = [];

  const ASN_BUILT_IN = [
    'TAG',
    'BOOLEAN',
    'INTEGER',
    'ENUMERATED',
    'REAL',
    'SEQUENCE',
    'SET',
    'NULL',
    'CHOICE',
    'ANY',
    'DATE',
    'TIME'
  ];
  
  const ASN_LITERALS = [
    'TRUE', 'FALSE', 'MIN', 'MAX'
  ]
  const ASN_KEYWORDS = [
      'IMPLICIT', 
      'EXPLICIT',
      'UNIVERSAL',
      'APPLICATION',
      'PRIVATE',
      'ABSENT',
      'ALL',
      'APPLICATION',
      'AUTOMATIC',
      "EXPORTS",
      "IMPORTS",
      "WITH",
      "FROM",
      "OPTIONAL",
      "DEFAULT",
      "ABSENT",
      "PRESENT",
      "EXCEPT",
      "UNION",
      "INTERCEPTION",
      "INCLUDES",
      "SIZE",
      "PATTERN",
      "SETTINGS",


    ];

    const RestrictedCharacterStringType = [
        'BMPString',
        'GeneralString',
        'GraphicString',
        'IA5String',
        'ISO646String',
        'NumericString',
        'PrintableString',
        'TeletexString',
        'T61String',
        'UniversalString',
        'UTF8String',
        'VideotexString',
        'VisibleString',
        'ObjectDescriptor',

    ];

    const KEYWORDS = {
        $pattern: /\w[\w-]*/,
        keyword: ASN_KEYWORDS,
        built_in: ASN_BUILT_IN.concat(RestrictedCharacterStringType),
        literal: ASN_LITERALS,
    };
    return {
        name: "ASN.1",
        aliases: [ 'asn', 'asn1' ],
        disableAutodetect: true,
//        keywords: KEYWORDS,
        contains: [
          {
            scope: 'keyword',
            begin: /\bDEFINITIONS\b/,
            end: /::=/,
            contains : [
              {
                scope: 'built_in',
                begin: /\b(?:AUTOMATIC|IMPLICIT|EXPLICIT)\s+TAGS\b/
              },
              {
                scope : 'built_in',
                begin : /\bEXTENSIBILITY\s+IMPLIED\b/
              },
              ASN_BLOCK_COMMENTS,
              ASN_LINE_COMMENTS
            ]
          },
          {
            begin: /\bBEGIN\b/,
            end:   /\bEND\b/,
//            keywords: KEYWORDS,
            contains : [
              {
                scope: 'built_in',
                match: /\bOBJECT\s+IDENTIFIER\b|\b(?:BIT|OCTET|UNIVERSAL)\s+STRING\b/
              },
              {
                match: /\bWITH\s+(?:SUCCESSORS|DESCENDANTS|SYNTAX|COMPONENTS?)\b/,
                scope: 'keyword'
              },
              {
                match: /\bIDENTIFIED\s+BY\b/,
                scope: 'keyword'
              },
              {
                match: /\bCOMPONENTS\s+OF\b/,
                scope: 'keyword'
              },
              hljs.QUOTE_STRING_MODE,
              {
                scope: 'number',
                begin: INTEGER_RE,
              },                      
              {
                scope: 'number',
                begin: REAL_RE,
              },                      
              {
                scope: 'string',
                begin: OCTETSTRING_RE,
              },                      
              {
                scope: 'string',
                begin: BITSTRING_RE,
              },                      
              ASN_DOCUMENTATION_BLOCK_COMMENTS,
              ASN_DOCUMENTATION_LINE_COMMENTS,
              ASN_BLOCK_COMMENTS,
              ASN_LINE_COMMENTS,              
              {
                scope: "punctuation",
                match: /::=|[\[\](){}@&,|]|\.{2,3}/
              },
              {
                match: ASN_TYPE_RE,
                keywords: KEYWORDS,
                scope: 'type'
              },
            ],
          },
          ASN_DOCUMENTATION_BLOCK_COMMENTS,
          ASN_DOCUMENTATION_LINE_COMMENTS,
          ASN_BLOCK_COMMENTS,
          ASN_LINE_COMMENTS
        ]
    };
}
