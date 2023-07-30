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
		stage("Deploy") {
      steps {
				withCredentials([string(credentialsId: 'itnun-back-doppler-token', variable: 'DOPPLER_TOKEN')]) { //set SECRET with the credential content
					sshPublisher(
						continueOnError: false, failOnError: true,
						publishers: [
							sshPublisherDesc(
								configName: "buildin-server",
								verbose: true,
									transfers: [
										sshTransfer(
											remoteDirectory: '~/docker-compose/itnun-back-nest',
											execCommand: 'git fetch origin main'
										),
										sshTransfer(
											remoteDirectory: '~/docker-compose/itnun-back-nest',
											execCommand: 'git checkout origin/main -- docker-compose-prod.yml'
										),
										sshTransfer(
											remoteDirectory: '~/docker-compose/itnun-back-nest',
											execCommand: 'docker pull seonwoo0808/itnun-back:lastest'
										),
										sshTransfer(
											remoteDirectory: '~/docker-compose/itnun-back-nest',
											execCommand: 'doppler run --token $DOPPLER_TOKEN  -- docker compose -f docker-compose-prod.yml up -d'
										),
									]
							)
						]
        	)
    		}
      }
    }
  }
}
