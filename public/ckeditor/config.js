/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {

    // %REMOVE_START%
    // The configuration options below are needed when running CKEditor from source files.
    // config.plugins = `dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc`


    config.plugins = "dialogui," +
        "dialog," +
        // "a11yhelp," +
        "dialogadvtab," +
        // "autogrow," +
        "basicstyles," +
        // "bidi," +
        "blockquote," +
        "button," +
        "panelbutton," +
        "panel," +
        "floatpanel," +
        "colorbutton," +
        "colordialog," +
        // "menu," +
        "contextmenu," +
        // "resize," +
        "toolbar," +
        // "elementspath," +
        "enterkey," +
        "entities," +
        "popup," +
        "filebrowser," +
        // "find," +
        "fakeobjects," +
        "floatingspace," +
        "listblock," +
        "richcombo," +
        // "font," +
        "format," +
        "horizontalrule," +
        "wysiwygarea," +
        "image," +
        "indent," +
        "indentblock," +
        "indentlist," +
        // "smiley," +
        "justify," +
        "menubutton," +
        // "language," +
        "link," +
        "list," +
        "liststyle," +
        "magicline," +
        "maximize," +
        // "newpage," +
        "pagebreak," +
        // "pastetext," +
        // "pastefromword," +
        // "preview," +
        // "print," +
        "removeformat," +
        // "save," +
        // "showblocks," +
        "showborders," +
        "specialchar," +
        // "scayt," +
        "stylescombo," +
        "tab," +
        "table," +
        "undo," +
        "tabletools";
    // "undo";
    // "wsc";

    config.toolbarGroups = [{
        name: 'styles',
        groups: ['styles']
    }, {
        name: 'basicstyles',
        groups: ['basicstyles', 'colors']
    },  {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
    }, {
        name: 'links',
        groups: ['links']
    }, {
        name: 'insert',
        groups: ['insert']
    }, {
        name: 'tools',
        groups: ['tools']
    }, {
        name: 'others',
        groups: ['others']
    }];

    config.removeButtons = 'Subscript,Superscript,Blockquote,Outdent,Indent,Styles,Anchor';

    config.skin = 'minimalist';
    // %REMOVE_END%

    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
};