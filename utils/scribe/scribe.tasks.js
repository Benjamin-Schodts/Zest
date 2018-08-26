import fs from 'fs';
import mkdirp from 'mkdirp';
import yaml from 'js-yaml';
import pretty from 'pretty';
import paths from '../config/paths.config';

export function translate(done) {
    fs.readdir(paths.dist.view.root, function(err, sourceFiles) {
        if (!err) {
            sourceFiles.forEach((sourceFile) => {
                if (sourceFile !== 'translated') {
                    fs.readFile(`${paths.dist.view.root}${sourceFile}`, { encoding: 'utf8' }, (err, data) => {
                        if (!err) {
                            processTranslations(data, sourceFile);
                        } else {
                            console.log(`Seems as if something went wrong in translate\n[${err}]`);
                        }
                    }); 
                }
            });
        } else {
            console.log(`Seems as if something went wrong in translate\n[${err}]`);
        }
    });

    done();
}

function processTranslations(data, sourceFile) {
    const translationKeys = getTranslationKeys(data);

    if (translationKeys && translationKeys.length > 0) {
        fs.readdir(paths.src.translations.root, function(err, translationFiles) {
            if (!err) {
                translationFiles.forEach((translationFile) => {
                    prepareTranslation(data, translationFile, translationKeys, sourceFile);
                });
            } else {
                console.log(`Seems as if something went wrong in processTranslations\n[${err}]`);
            }
        });
    }
}

function getTranslationKeys(html) {
    // Capture group 1: ({{)
    // Negate set 0 or more times: [^}}]*
    // Capture group 2: (}})
    return html.match(/({{)[^}}]*(}})/g);
}

function prepareTranslation(html, translationFile, translationKeys, sourceFile) {
    let translatedContent = html;

    translationKeys.forEach((key) => {
        const lookupKey = lookUpTranslation(key, translationFile, sourceFile);
        
        if (!(lookupKey instanceof Object)) {
            translatedContent = translatedContent.replace(
                new RegExp(key, 'g'), 
                lookupKey
            );
        }
    });

    createTranslationFile(translatedContent, translationFile, sourceFile);
}

function lookUpTranslation(key, translationFile, sourceFile) {
    const translations = yaml.safeLoad(
        fs.readFileSync(`${paths.src.translations.root}${translationFile}`, 'utf8')
    );

    const splitTranslationLookupKey = key.replace(new RegExp('[{}]', 'g'), '').trim().split('.');
    let lookupKey = translations;

    splitTranslationLookupKey.every((part) => {
        if (lookupKey[part]) {
            lookupKey = lookupKey[part];
            return true;
        } else {
            console.log(`[${sourceFile}] Cannot find {{${splitTranslationLookupKey}}} key in ${translationFile}`);
            return false;
        }
    });

    return lookupKey;
}

function createTranslationFile(translatedContent, translationFile, sourceFile) {
    const finalContent = pretty(translatedContent, {ocd: true});

    mkdirp(`${paths.dist.view.translated}${sourceFile.split('.')[0]}`, function (err) {
        if (err) {
            console.log(`Seems as if something went wrong in createTranslationFile\n[${err}]`)
        } else {
            fs.writeFile(
                `${paths.dist.view.translated}${sourceFile.split('.')[0]}/${sourceFile.split('.')[0]}_${translationFile.split('.')[0]}.${sourceFile.split('.')[1]}`, // Destination path
                finalContent, // Content
                function (err) {
                    if (!err) {
                        console.log(`Translation ${translationFile.split('.')[0]} made for ${sourceFile}`);
                    } else {
                        console.log(`Seems as if something went wrong in createTranslationFile\n[${err}]`);
                    }
                }
            );
        }
    });    
}