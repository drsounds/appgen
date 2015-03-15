var ejs = require('ejs');
var _ = require('underscore');
var path = require('path');

var fs = require('fs');

console.log(process.argv);
var target_dir = process.argv[2];
var model = JSON.parse(fs.readFileSync(target_dir + '/model.json'));



/** Batch folder */
function batchFolder (template_dir, output_dir) {
    console.log(template_dir);
    var files = fs.readdirSync(template_dir);
    console.log(files);
    for (var i = 0; i < files.length; i++) {
        var file =  files[i];
        console.log("File", JSON.stringify(template_dir + "/" + (file + '')));
        

            if (fs.lstatSync(template_dir + "/" + file).isDirectory()) {

                console.log("Directory ", template_dir + "/" + file);
                try {
                    if (file instanceof Object) {
                        continue;
                    }
                   fs.mkdirSync(output_dir + '/' + file);
                } catch (e) {
                    console.log(e);
                }
                try {
                    if (file instanceof Object) {
                        continue;
                    }
                    batchFolder(template_dir + '/' + file, output_dir + '/' + file);
                } catch (e) {
                    console.log(e);
                }
            } else if(fs.existsSync(template_dir + '/' + file)) {
                console.log(template_dir + '/' + file);
                var tmpl = fs.readFileSync(template_dir + '/' + file);
                console.log(tmpl);
                var template = _.template(tmpl + '');
                var output = template({model: model});
                console.log(output_dir + '/' + file);
                fs.writeFileSync(output_dir + '/' + file, output);
            }
        
    }
}

batchFolder(__dirname + '/templates/object', target_dir);
try {
    fs.mkdirSync(target_dir + '/../' + model.model + 's');
} catch (e) {

}
batchFolder(__dirname + '/templates/objects', target_dir + '/../' + model.model + 's');


