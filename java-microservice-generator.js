/**
 * Java微服务项目生成器配置
 * 负责配置plop生成Java微服务项目的相关模板和参数
 */

module.exports = function(plop) {
    const userWorkingDir = process.env.USER_WORKING_DIR || process.cwd();
    
    // Java微服务项目生成器
    plop.setGenerator('java-microservice', {
        description: '生成完整的Java微服务项目结构',
        prompts: [
            {
                type: 'input',
                name: 'groupId',
                message: '请输入Maven Group ID (例如: org.flooc)',
                default: 'org.flooc'
            },
            {
                type: 'input',
                name: 'artifactId',
                message: '请输入Maven Artifact ID',
                validate: function(value) {
                    if (!value || value.trim() === '') {
                        return 'Artifact ID不能为空';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'appDir',
                message: '请输入Application Directory',
                default: function(answers) {
                    // 拼接groupId
                    const groupDir = answers.groupId.replace(/\./g, '/');
                    return `${groupDir}/${answers.artifactId.toLowerCase().replace(/-/g, '/')}`;
                }
            },
            {
                type: 'input',
                name: 'appName',
                message: '请输入应用名称',
                default: function(answers) {
                    return answers.artifactId;
                }
            },
            {
                type: 'input',
                name: 'appVersion',
                message: '请输入项目版本号',
                default: '1.0.0-SNAPSHOT'
            },
            {
                type: 'input',
                name: 'appPort',
                message: '请输入应用端口号',
                default: '40000'
            },
            {
                type: 'input',
                name: 'servletContextPath',
                message: '请输入Servlet Context Path',
                default: '/'
            },
            {
                type: 'input',
                name: 'ns',
                message: '请输入命名空间',
                validate: function(value) {
                    if (!value || value.trim() === '') {
                        return '命名空间不能为空';
                    }
                    return true;
                }
            },
            {                
                type: 'input',                
                name: 'startId',                
                message: '请输入启动类名称',                
                default: function(answers) {                    
                    // artifactId拆分转换为驼峰且大写规范的名字                    
                    const startId = answers.artifactId.split('-').map((word, index) => {                        
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();                    
                    }).join('');                    
                    return startId + 'Application';                
                }            
            },
            {
                type: 'input',
                name: 'jasyptPassword',
                message: '请输入Jasypt加密密码',
                validate: function(value) {
                    if (!value || value.trim() === '') {
                        return 'Jasypt加密密码不能为空';
                    }
                    return true;
                }
            },
            {
                type: 'confirm',
                name: 'generateInCurrentDir',
                message: '是否直接在当前目录生成项目？(默认创建以artifactId命名的子目录)',
                default: false
            }
        ],
        actions: function(data) {
            // 创建所有需要生成的文件操作
            const actions = [];
            // 使用relativePathPrefix替代basePath
            const relativePathPrefix = data.generateInCurrentDir ? '' : '{{artifactId}}/';
            const modulePrefix = '{{artifactId}}-';
            // 根目录文件
            actions.push(
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + '.apifox-helper.properties',
                    templateFile: 'plop-templates/java-microservice/.apifox-helper.properties.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + '.gitattributes',
                    templateFile: 'plop-templates/java-microservice/.gitattributes.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + '.gitignore',
                    templateFile: 'plop-templates/java-microservice/.gitignore.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + 'pom.xml',
                    templateFile: 'plop-templates/java-microservice/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + 'compile.sh',
                    templateFile: 'plop-templates/java-microservice/compile.sh.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + 'flow.sh',
                    templateFile: 'plop-templates/java-microservice/flow.sh.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + 'mvnw',
                    templateFile: 'plop-templates/java-microservice/mvnw.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + 'mvnw.cmd',
                    templateFile: 'plop-templates/java-microservice/mvnw.cmd.hbs'
                },
                
                // mvn包装器目录
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + '.mvn/wrapper/maven-wrapper.properties',
                    templateFile: 'plop-templates/java-microservice/.mvn/wrapper/maven-wrapper.properties.hbs'
                },
                
                // 模块目录
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'api/pom.xml',
                    templateFile: 'plop-templates/java-microservice/api/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'application/pom.xml',
                    templateFile: 'plop-templates/java-microservice/application/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'domain/pom.xml',
                    templateFile: 'plop-templates/java-microservice/domain/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'dubbo-provider/pom.xml',
                    templateFile: 'plop-templates/java-microservice/dubbo-provider/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'infrastructure/pom.xml',
                    templateFile: 'plop-templates/java-microservice/infrastructure/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'presentation/pom.xml',
                    templateFile: 'plop-templates/java-microservice/presentation/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/pom.xml',
                    templateFile: 'plop-templates/java-microservice/startup/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'tests/pom.xml',
                    templateFile: 'plop-templates/java-microservice/tests/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'distribution/pom.xml', 
                    templateFile: 'plop-templates/java-microservice/distribution/pom.xml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'distribution/release-assembly.xml',
                    templateFile: 'plop-templates/java-microservice/distribution/release-assembly.xml.hbs'
                },
                
                // 云部署相关文件
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'distribution/cloud/Dockerfile',
                    templateFile: 'plop-templates/java-microservice/distribution/cloud/Dockerfile.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'distribution/cloud/applydc.sh',
                    templateFile: 'plop-templates/java-microservice/distribution/cloud/applydc.sh.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'distribution/cloud/applyk8s.sh',
                    templateFile: 'plop-templates/java-microservice/distribution/cloud/applyk8s.sh.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'distribution/cloud/docker-compose.yml',
                    templateFile: 'plop-templates/java-microservice/distribution/cloud/docker-compose.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'distribution/cloud/k8s.yml',
                    templateFile: 'plop-templates/java-microservice/distribution/cloud/k8s.yml.hbs'
                },

                // startup文件
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/java/{{appDir}}/{{startId}}.java',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/java/Application.java.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/java/{{appDir}}/exception/AppWebExceptionHandler.java',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/java/exception/AppWebExceptionHandler.java.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-cloud-dev.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-cloud-dev.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-cloud-gray.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-cloud-gray.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-cloud-prod.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-cloud-prod.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-cloud-staging.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-cloud-staging.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-cloud-test.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-cloud-test.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-dev.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-dev.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-gray.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-gray.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-staging.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-staging.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-prod.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-prod.yml.hbs'
                },
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'startup/src/main/resources/application-test.yml',
                    templateFile: 'plop-templates/java-microservice/startup/src/main/resources/application-test.yml.hbs'
                },
                // domain文件
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'domain/src/main/java/{{appDir}}/domain/package-info.java',
                    templateFile: 'plop-templates/java-microservice/domain/src/main/java/package-info.java.hbs'
                },
                // tests文件
                {
                    type: 'add',
                    path: userWorkingDir + '/' + relativePathPrefix + modulePrefix + 'tests/src/test/java/{{appDir}}/Abstract{{startId}}Test.java',
                    templateFile: 'plop-templates/java-microservice/tests/src/test/java/AbstractApplicationTest.java.hbs'
                }
            );
            
            return actions;
        }
    });
};