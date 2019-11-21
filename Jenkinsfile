pipeline {
    environment {
        registry = "linea/sculptor"
        registryCredential = 'Dockerhub'
        dockerImage = ''
        deployment = 'sculptor'
        namespace = 'scienceportal-dev'
        namespace_prod = 'scienceportal'
        commit = ''
    }
    agent any
    stages {
        stage('Building and push MASTER image') {
            when {
                allOf {
                    expression {
                        env.TAG_NAME == null
                    }
                    expression {
                        env.BRANCH_NAME.toString().equals('master')
                    }
                }
            }
            steps {
                script {
                    sh 'docker build -t $registry:$GIT_COMMIT .'
                    docker.withRegistry( '', registryCredential ) {
                        sh 'docker push $registry:$GIT_COMMIT'
                        sh 'docker rmi $registry:$GIT_COMMIT'
                    }
                    sh """
                        curl -D - -X \"POST\" \
                        -H \"content-type: application/json\" \
                        -H \"X-Rundeck-Auth-Token: $RD_AUTH_TOKEN\" \
                        -d '{\"argString\": \"-namespace $namespace -commit $GIT_COMMIT -image $registry:$GIT_COMMIT -deployment $deployment\"}' \
                        https://run.linea.gov.br/api/1/job/4e39b30d-fdec-4847-8276-88bb487e9136/executions
                    """
                }
            }
        }
        stage('Building and push RELEASE image') {
            when {
                expression {
                    env.TAG_NAME != null
                }
            }
            steps {
                script {
                    sh 'docker build -t $registry:$TAG_NAME .'
                    docker.withRegistry( '', registryCredential ) {
                        sh 'docker push $registry:$TAG_NAME'
                        sh 'docker rmi $registry:$TAG_NAME'
                    }
                    sh """
                        curl -D - -X \"POST\" \
                        -H \"content-type: application/json\" \
                        -H \"X-Rundeck-Auth-Token: $RD_AUTH_TOKEN\" \
                        -d '{\"argString\": \"-namespace $namespace_prod -commit $TAG_NAME -image $registry:$TAG_NAME -deployment $deployment\"}' \
                        https://run.linea.gov.br/api/1/job/4e39b30d-fdec-4847-8276-88bb487e9136/executions
                    """
                }
            }
        }
    }
}
