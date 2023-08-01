def component = [
		Preprocess: false,
		Hyper: false,
		Train: false,
		Test: false,
		Bento: false
]
pipeline {
	agent any
	stages {
		stage("Checkout") {
			steps {
				checkout scm
			}
		}
		stage("Build") {
      steps {
        sh "docker build . --tag itnun-back:latest"
      }
		}
	  stage("Tag and Push") {
			steps {
        withCredentials([[$class: 'UsernamePasswordMultiBinding',
								          credentialsId: 'docker-hub',
								          usernameVariable: 'DOCKER_USER_ID',
								          passwordVariable: 'DOCKER_USER_PASSWORD'
				]]){
					sh 'docker login -u $DOCKER_USER_ID -p $DOCKER_USER_PASSWORD'
					sh 'docker tag itnun-back:latest $DOCKER_USER_ID/itnun-back:latest'
					sh 'docker push $DOCKER_USER_ID/itnun-back:latest'
				  sh 'docker tag $DOCKER_USER_ID/itnun-back:latest $DOCKER_USER_ID/itnun-back:$BUILD_NUMBER'
					sh 'docker push $DOCKER_USER_ID/itnun-back:$BUILD_NUMBER'
				}	
			}
		}
		stage("SSH-Deploy") {
			steps {
				script {
					// Secret Text 타입의 자격 증명을 불러옵니다.
					withCredentials([
						string(credentialsId: 'buildin-server-host', variable: 'HOST'),
						string(credentialsId: 'buildin-server-port', variable: 'PORT'),
						string(credentialsId: 'itnun-back-doppler-token', variable: 'DOPPLER_TOKEN'),
						sshUserPrivateKey(credentialsId: 'buildin-server', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName'),
					]) {
						def remote = [:]
						remote.name = 'Remote Server'
						remote.host = HOST
						remote.port = PORT as int
						remote.allowAnyHosts = true
						remote.user = userName
						remote.credentialsId = identity

						def commandString = """
								cd /home/seonwoo0808/docker-compose/itnun-back-nest
								git pull origin main
								docker pull seonwoo0808/itnun-back:lastest
								docker-compose up -d
								doppler run --token $DOPPLER_TOKEN  -- docker compose -f docker-compose-prod.yml up -d
						"""

						sshCommand remote: remote, command: commandString
					}
				}
			}
		}
  }
}