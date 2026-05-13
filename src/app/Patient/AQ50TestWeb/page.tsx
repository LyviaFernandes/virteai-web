"use client"

import './test.css'
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';

export default function BigQuestionnaire () {
    return(
        <div className="Questionnaire-Section">
            <HeaderHome/>

            <div className="description">
                <div className="title-wrapper">
                    <h1>Teste - Quociente do Espectro Autista</h1>
                </div>
                <p>Abaixo está o AQ-50 (Teste de Quociente do Espectro Autista), um teste mais robusto, 
                    composto por 50 questões que referenciam o nível de suspeita de autismo em um indivíduo. 
                    Responda de acordo com o que se identifica.</p>
            </div>

            
            <h2>AQ-50</h2>

            <div className="card-questions">
                <form className="questions">
                    <p>1. Prefiro fazer coisas com outras pessoas do que sozinho(a).</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>2. Prefiro fazer as coisas sempre da mesma maneira.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>3. Quando tento imagina uma coisa, acho muito fácil criar uma imagem na minha mente.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>4. Com frequência, fico tão absorvido(a) com uma coisa, que esqueço todo o resto.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>5. Frequentemente noto pequenos ruídos que outras pessoas não ouvem.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>6. Costumo prestar atenção aos números das placas dos automóveis ou a outras sequências de informação do mesmo tipo</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                {/* //////// */}
                <form className="questions">
                    <p>7. Com frequência, as outras pessoas me dizem que falei algo indelicado, apesar de eu achar que fui delicado(a).</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>8. Com frequência, as outras pessoas me dizem que falei algo indelicado, apesar de eu achar que fui delicado(a).</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>9. Sou fascinado(a) por datas.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>10. Quando estou em grupo, tenho facilidade em seguir várias conversas ao mesmo tempo.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>11. Tenho facilidade em compreender situações sociais.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>12. Tenho tendência a notar detalhes que os outros não reparam.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>13. Prefiro ir a uma biblioteca do que a uma festa.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>14. Tenho facilidade em inventar histórias.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>15. Tenho maior tendência a me aproximar de pessoas do que de coisas.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>16. Tenho tendência a ter interesses fortes e fico incomodado(a) se não posso me dedicar a eles.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                {/* //////// */}
                <form className="questions">
                    <p>17. Gosto de bater papo.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>18. Quando estou falando, as outras pessoas têm dificuldade em tomar a palavra.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>19. Os números me fascinam.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>20. Quando leio uma história, sinto dificuldade em entender as intenções dos personagens.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>21. Não aprecio ler livros de ficção.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>22. Tenho dificuldade em fazer novos amigos.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>23. Vejo, constantemente, padrões nas coisas que me rodeiam.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>24. Prefiro ir ao teatro do que ir a um museu.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>25. Não fico incomodado(a) se minha rotina diária for alterada.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>26. Com frequência sinto que não sei manter uma conversa.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                {/* //////// */}
                <form className="questions">
                    <p>27. Tenho facilidade em “ler nas entrelinhas” quando falam comigo.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>28. Geralmente me concentro mais no todo do que nos detalhes.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>29. Não sou muito bom/boa em lembrar números de telefone.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>30. Geralmente me concentro mais no todo do que nos detalhes.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>31. Consigo dizer quando a pessoa com quem estou conversando fica entediada.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>32. Consigo facilmente fazer mais do que uma coisa ao mesmo tempo.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>33. Quando falo no telefone, não tenho a certeza quando é a minha vez de falar.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>34. Gosto de fazer as coisas de forma espontânea.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>35. Com frequência sou o(a) último(a) que entende uma piada.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>36. Tenho facilidade em entender o que uma pessoa está pensando ou sentindo 
                        apenas olhando para o seu rosto.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                {/* //////// */}
                <form className="questions">
                    <p>37. Se sou interrompido(a), consigo rapidamente voltar ao que estava fazendo.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>38. Sou bom/boa de papo.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>39. Os outros frequentemente me dizem que eu insisto muito nas mesmas coisas.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>40. Quando era criança, gostava de brincar de faz-de-conta com as outras crianças.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>41. Gosto de colecionar informação sobre categorias de coisas (ex., tipos de carros, de aves, de trens, de plantas, etc.).</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>42. Tenho dificuldade de me imaginar na pele de outra pessoa.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>43. Gosto de planejar com cuidado todas as atividades em que participo.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>44. Aprecio eventos sociais.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>45. Tenho dificuldade em entender as intenções das outras pessoas.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>46. Situações novas me deixam ansioso(a).</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                {/* //////// */}
                <form className="questions">
                    <p>47. Gosto de conhecer pessoas novas.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>48. Tenho uma postura conciliadora em situações de interação social.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>49. Tenho dificuldade em lembrar o dia de aniversário dos outros.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorgreen">
                    <p>50. Tenho muita facilidade em brincar de faz-de-conta com as crianças.</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                
                <button className='envite'>
                    <p>Enviar</p>
                </button>
            </div>

            <Footer/>
        </div>
    )
}