'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fitness-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutUs.html" data-type="entity-link" >AboutUs</a>
                            </li>
                            <li class="link">
                                <a href="components/AboutUsSummary.html" data-type="entity-link" >AboutUsSummary</a>
                            </li>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthLayout.html" data-type="entity-link" >AuthLayout</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthSocialLogin.html" data-type="entity-link" >AuthSocialLogin</a>
                            </li>
                            <li class="link">
                                <a href="components/Button.html" data-type="entity-link" >Button</a>
                            </li>
                            <li class="link">
                                <a href="components/Card.html" data-type="entity-link" >Card</a>
                            </li>
                            <li class="link">
                                <a href="components/Carousel.html" data-type="entity-link" >Carousel</a>
                            </li>
                            <li class="link">
                                <a href="components/ChangePasswordModal.html" data-type="entity-link" >ChangePasswordModal</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatbotComponent.html" data-type="entity-link" >ChatbotComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatBubbleComponent.html" data-type="entity-link" >ChatBubbleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClassDetails.html" data-type="entity-link" >ClassDetails</a>
                            </li>
                            <li class="link">
                                <a href="components/Classes.html" data-type="entity-link" >Classes</a>
                            </li>
                            <li class="link">
                                <a href="components/EditPreferenceModal.html" data-type="entity-link" >EditPreferenceModal</a>
                            </li>
                            <li class="link">
                                <a href="components/FloatingControls.html" data-type="entity-link" >FloatingControls</a>
                            </li>
                            <li class="link">
                                <a href="components/Footer.html" data-type="entity-link" >Footer</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPassword.html" data-type="entity-link" >ForgotPassword</a>
                            </li>
                            <li class="link">
                                <a href="components/Healthy.html" data-type="entity-link" >Healthy</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthyDetails.html" data-type="entity-link" >HealthyDetails</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthySection.html" data-type="entity-link" >HealthySection</a>
                            </li>
                            <li class="link">
                                <a href="components/HelpModal.html" data-type="entity-link" >HelpModal</a>
                            </li>
                            <li class="link">
                                <a href="components/Hero.html" data-type="entity-link" >Hero</a>
                            </li>
                            <li class="link">
                                <a href="components/Home.html" data-type="entity-link" >Home</a>
                            </li>
                            <li class="link">
                                <a href="components/Input.html" data-type="entity-link" >Input</a>
                            </li>
                            <li class="link">
                                <a href="components/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="components/MainLayout.html" data-type="entity-link" >MainLayout</a>
                            </li>
                            <li class="link">
                                <a href="components/MarqueeTricker.html" data-type="entity-link" >MarqueeTricker</a>
                            </li>
                            <li class="link">
                                <a href="components/MessageCardComponent.html" data-type="entity-link" >MessageCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavBar.html" data-type="entity-link" >NavBar</a>
                            </li>
                            <li class="link">
                                <a href="components/NumberPicker.html" data-type="entity-link" >NumberPicker</a>
                            </li>
                            <li class="link">
                                <a href="components/Onboarding.html" data-type="entity-link" >Onboarding</a>
                            </li>
                            <li class="link">
                                <a href="components/Otp.html" data-type="entity-link" >Otp</a>
                            </li>
                            <li class="link">
                                <a href="components/PrivacyPolicyModal.html" data-type="entity-link" >PrivacyPolicyModal</a>
                            </li>
                            <li class="link">
                                <a href="components/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="components/Register.html" data-type="entity-link" >Register</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPassword.html" data-type="entity-link" >ResetPassword</a>
                            </li>
                            <li class="link">
                                <a href="components/SecurityModal.html" data-type="entity-link" >SecurityModal</a>
                            </li>
                            <li class="link">
                                <a href="components/Tabs.html" data-type="entity-link" >Tabs</a>
                            </li>
                            <li class="link">
                                <a href="components/WhyUs.html" data-type="entity-link" >WhyUs</a>
                            </li>
                            <li class="link">
                                <a href="components/Workouts.html" data-type="entity-link" >Workouts</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ChatService.html" data-type="entity-link" >ChatService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatbotStateService.html" data-type="entity-link" >ChatbotStateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeminiChatService.html" data-type="entity-link" >GeminiChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthyService.html" data-type="entity-link" >HealthyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/languageService.html" data-type="entity-link" >languageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MuscleService.html" data-type="entity-link" >MuscleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserPreferenceService.html" data-type="entity-link" >UserPreferenceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/authGuard.html" data-type="entity-link" >authGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/noAuthGuard.html" data-type="entity-link" >noAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActivityLevel.html" data-type="entity-link" >ActivityLevel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActivityLevelsResponse.html" data-type="entity-link" >ActivityLevelsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthApiResponse.html" data-type="entity-link" >AuthApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthLayoutRouteData.html" data-type="entity-link" >AuthLayoutRouteData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthLayoutStep.html" data-type="entity-link" >AuthLayoutStep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarouselItem.html" data-type="entity-link" >CarouselItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangePasswordRequest.html" data-type="entity-link" >ChangePasswordRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangePasswordResponse.html" data-type="entity-link" >ChangePasswordResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChatConversation.html" data-type="entity-link" >ChatConversation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChatMessage.html" data-type="entity-link" >ChatMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DifficultyLevel.html" data-type="entity-link" >DifficultyLevel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DifficultyLevelsResponse.html" data-type="entity-link" >DifficultyLevelsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Exercise.html" data-type="entity-link" >Exercise</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExercisesByMuscleAndDifficultyResponse.html" data-type="entity-link" >ExercisesByMuscleAndDifficultyResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgotPasswordRequest.html" data-type="entity-link" >ForgotPasswordRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthyCategories.html" data-type="entity-link" >HealthyCategories</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthyMeal.html" data-type="entity-link" >HealthyMeal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthyMealDetails.html" data-type="entity-link" >HealthyMealDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthyMeals.html" data-type="entity-link" >HealthyMeals</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthyMealsDetails.html" data-type="entity-link" >HealthyMealsDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meal.html" data-type="entity-link" >Meal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MealAPIResponse.html" data-type="entity-link" >MealAPIResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MuscleAPIResponse.html" data-type="entity-link" >MuscleAPIResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MuscleGroup.html" data-type="entity-link" >MuscleGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MuscleGroupByIdResponse.html" data-type="entity-link" >MuscleGroupByIdResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MuscleGroupResponse.html" data-type="entity-link" >MuscleGroupResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OnboardingChoice.html" data-type="entity-link" >OnboardingChoice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OnboardingStepData.html" data-type="entity-link" >OnboardingStepData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPasswordRequest.html" data-type="entity-link" >ResetPasswordRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SigninRequest.html" data-type="entity-link" >SigninRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignupRequest.html" data-type="entity-link" >SignupRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignupResponse.html" data-type="entity-link" >SignupResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabItem.html" data-type="entity-link" >TabItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyResetCodeRequest.html" data-type="entity-link" >VerifyResetCodeRequest</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
