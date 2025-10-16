// language.js
document.addEventListener('DOMContentLoaded', function() {
    // Словарь переводов для всех поддерживаемых языков
    const translations = {
        'ru': {
            // Заголовок и мета-данные
            'title': 'AMLCheker Scan | Продвинутая проверка AML крипто-кошельков',
            'description': 'Профессиональная проверка AML соответствия для криптовалютных кошельков. Проверяйте чистоту кошельков, обнаруживайте подозрительную активность и обеспечивайте соответствие требованиям с нашей передовой технологией скрининга.',
            
            // Навигация
            'features': 'Функции',
            'how-it-works': 'Как это работает',
            'faq': 'FAQ',
            
            // Hero секция
            'hero-title': 'Продвинутая проверка AML кошельков',
            'hero-subtitle': 'Защитите свои активы с профессиональным скринингом криптовалютных кошельков и проверкой соответствия',
            'check-wallet': 'Проверить кошелек',
            'connect-wallet': 'Подключить кошелек',
            
            // Features секция
            'features-title': 'Комплексная безопасность кошельков',
            'risk-scoring': 'Оценка риска',
            'risk-scoring-desc': 'Продвинутые алгоритмы рассчитывают процент риска кошелька на основе истории транзакций и связей',
            'source-analysis': 'Анализ источников',
            'source-analysis-desc': 'Определяйте происхождение средств включая даркнет-маркеты, микшеры, мошенничества и санкционированные лица',
            'real-time-monitoring': 'Мониторинг в реальном времени',
            'real-time-monitoring-desc': 'Непрерывный мониторинг транзакций с мгновенными оповещениями о подозрительной активности',
            
            // How It Works
            'how-it-works-title': 'Как работает скрининг кошельков',
            'step1-title': 'Подключить кошелек',
            'step1-desc': 'Безопасно подключите ваш криптовалютный кошелек используя предпочитаемого провайдера',
            'step2-title': 'Глубокий анализ',
            'step2-desc': 'Наша система сканирует историю транзакций и связи через множество блокчейнов',
            'step3-title': 'Получить отчет',
            'step3-desc': 'Получите детальную оценку рисков с четкими рекомендациями и статусом соответствия',
            
            // FAQ
            'faq-title': 'Часто задаваемые вопросы',
            'faq1-question': 'Что такое проверка AML для криптовалютных кошельков?',
            'faq1-answer': 'Проверка AML (против отмывания денег) - это детальный анализ рисков криптовалютных кошельков и транзакций, который идентифицирует связи с незаконной деятельностью, такой как даркнет-маркеты, санкции, мошенничества и другие финансовые преступления. Это помогает определить чистоту активов и защититься от украденных монет.',
            'faq2-question': 'Почему проверки AML важны для крипто-бизнеса?',
            'faq2-answer': 'Проверки AML критически важны, потому что они предотвращают отмывание денег и финансирование терроризма, одновременно защищая ваш бизнес от эксплуатации злоумышленниками. Несоблюдение может привести к регуляторным штрафам, заморозке активов, репутационному ущербу и потере банковских отношений.',
            'faq3-question': 'Что включает процесс проверки AML?',
            'faq3-answer': 'Наш процесс AML включает: оценку риска, показывающую вероятность связей с незаконной деятельностью, анализ источников, идентифицирующий категории такие как микшеры и мошенничества, анализ связей, проверяющий историю транзакций, и анализ перспективы транзакций для входящих и исходящих платежей.',
            'faq4-question': 'Кому нужно соответствие AML в криптовалюте?',
            'faq4-answer': 'Биржи, кастодиальные кошельки, OTC-дески, брокеры, NFT и DeFi платформы, и любые провайдеры услуг виртуальных активов (VASP), которые обрабатывают транзакции или хранят клиентские активы, должны соответствовать регуляциям AML.',
            'faq5-question': 'Насколько точна ваша проверка кошельков?',
            'faq5-answer': 'Наша оценка риска основана на множестве источников данных и продвинутых алгоритмах, обеспечивая надежные данные для комплексного анализа. Мы предоставляем мгновенные проверки с глобальным покрытием, помогая идентифицировать риски в реальном времени.',
            
            // CTA секция
            'cta-title': 'Готовы защитить свои активы?',
            'cta-subtitle': 'Начните защищать свои криптовалютные инвестиции сегодня с профессиональным AML скринингом',
            'check-now': 'Проверить ваш кошелек сейчас',
            
            // Футер
            'footer': '© 2025 AMLCheker Scan. Все права защищены. Профессиональные решения AML соответствия.',
            
            // Модальное окно
            'choose-wallet': 'Выберите ваш кошелек',
            'trust-wallet': 'Trust Wallet',
            'tronlink': 'TronLink',
            'klever-wallet': 'Klever Wallet',
            'mathwallet': 'MathWallet',
            'safepal': 'SafePal',
            'walletconnect': 'WalletConnect'
        },
        'es': {
            'title': 'AMLCheker Scan | Verificación AML Avanzada de Carteras Cripto',
            'description': 'Verificación profesional de cumplimiento AML para carteras de criptomonedas. Verifique la pureza de carteras, detecte actividad sospechosa y asegure el cumplimiento regulatorio con nuestra tecnología avanzada de screening.',
            'features': 'Características',
            'how-it-works': 'Cómo funciona',
            'faq': 'Preguntas Frecuentes',
            'hero-title': 'Verificación AML Avanzada de Carteras',
            'hero-subtitle': 'Proteja sus activos con screening profesional de carteras de criptomonedas y verificación de cumplimiento',
            'check-wallet': 'Verificar Cartera',
            'connect-wallet': 'Conectar Cartera',
            'features-title': 'Seguridad Integral de Carteras',
            'risk-scoring': 'Puntuación de Riesgo',
            'risk-scoring-desc': 'Algoritmos avanzados calculan el porcentaje de riesgo de la cartera basado en historial de transacciones y conexiones',
            'source-analysis': 'Análisis de Fuentes',
            'source-analysis-desc': 'Identifique orígenes de fondos incluyendo mercados darknet, mezcladores, estafas y entidades sancionadas',
            'real-time-monitoring': 'Monitoreo en Tiempo Real',
            'real-time-monitoring-desc': 'Monitoreo continuo de transacciones con alertas instantáneas para actividades sospechosas',
            'how-it-works-title': 'Cómo funciona el Screening de Carteras',
            'step1-title': 'Conectar Cartera',
            'step1-desc': 'Conecte de forma segura su cartera de criptomonedas usando su proveedor preferido',
            'step2-title': 'Análisis Profundo',
            'step2-desc': 'Nuestro sistema escanea el historial de transacciones y conexiones a través de múltiples blockchains',
            'step3-title': 'Obtener Reporte',
            'step3-desc': 'Reciba evaluación de riesgos detallada con recomendaciones claras y estado de cumplimiento',
            'faq-title': 'Preguntas Frecuentes',
            'faq1-question': '¿Qué es una verificación AML para carteras de criptomonedas?',
            'faq1-answer': 'Una verificación AML (Anti-Lavado de Dinero) es un análisis detallado de riesgo de carteras de criptomonedas y transacciones que identifica vínculos con actividades ilícitas como mercados darknet, sanciones, estafas y otros crímenes financieros. Ayuda a determinar la pureza de los activos y proteger contra monedas robadas.',
            'faq2-question': '¿Por qué son importantes las verificaciones AML para negocios crypto?',
            'faq2-answer': 'Las verificaciones AML son cruciales porque previenen el lavado de dinero y el financiamiento del terrorismo mientras protegen su negocio de ser explotado por actores maliciosos. El incumplimiento puede resultar en sanciones regulatorias, activos congelados, daño reputacional y pérdida de relaciones bancarias.',
            'faq3-question': '¿Qué incluye el proceso de verificación AML?',
            'faq3-answer': 'Nuestro proceso AML incluye: puntuación de riesgo mostrando probabilidad de conexiones con actividad ilícita, análisis de fuentes identificando categorías como mezcladores y fraudes, análisis de conexiones revisando historial de transacciones, y análisis de perspectiva de transacciones para pagos entrantes y salientes.',
            'faq4-question': '¿Quién necesita cumplimiento AML en criptomonedas?',
            'faq4-answer': 'Exchanges, carteras custodiales, desks OTC, brokers, plataformas NFT y DeFi, y cualquier proveedor de servicios de activos virtuales (VASP) que procese transacciones o mantenga activos de clientes deben cumplir con regulaciones AML.',
            'faq5-question': '¿Qué tan preciso es su screening de carteras?',
            'faq5-answer': 'Nuestra puntuación de riesgo se basa en múltiples fuentes de datos y algoritmos avanzados, asegurando que tenemos datos confiables para análisis integral. Proveemos verificaciones instantáneas con cobertura global, ayudando a identificar riesgos en tiempo real.',
            'cta-title': '¿Listo para asegurar sus activos?',
            'cta-subtitle': 'Comience a proteger sus inversiones en criptomonedas hoy con screening AML profesional',
            'check-now': 'Verifique su cartera ahora',
            'footer': '© 2025 AMLCheker Scan. Todos los derechos reservados. Soluciones profesionales de cumplimiento AML.',
            'choose-wallet': 'Elija su cartera',
            'trust-wallet': 'Trust Wallet',
            'tronlink': 'TronLink',
            'klever-wallet': 'Klever Wallet',
            'mathwallet': 'MathWallet',
            'safepal': 'SafePal',
            'walletconnect': 'WalletConnect'
        },
        'tr': {
            'title': 'AMLCheker Scan | Gelişmiş AML Kripto Cüzdan Doğrulama',
            'description': 'Kripto para cüzdanları için profesyonel AML uyumluluk kontrolü. Cüzdan saflığını doğrulayın, şüpheli aktiviteyi tespit edin ve gelişmiş tarama teknolojimizle düzenleyici uyumu sağlayın.',
            'features': 'Özellikler',
            'how-it-works': 'Nasıl Çalışır',
            'faq': 'SSS',
            'hero-title': 'Gelişmiş AML Cüzdan Doğrulama',
            'hero-subtitle': 'Profesyonel kripto para cüzdan taraması ve uyumluluk kontrolü ile varlıklarınızı koruyun',
            'check-wallet': 'Cüzdanı Kontrol Et',
            'connect-wallet': 'Cüzdanı Bağla',
            'features-title': 'Kapsamlı Cüzdan Güvenliği',
            'risk-scoring': 'Risk Skorlama',
            'risk-scoring-desc': 'Gelişmiş algoritmalar, işlem geçmişi ve bağlantılara dayalı olarak cüzdan risk yüzdesini hesaplar',
            'source-analysis': 'Kaynak Analizi',
            'source-analysis-desc': 'Karanlık ağ pazarları, mikserler, dolandırıcılıklar ve yaptırımlı varlıklar dahil fon kaynaklarını belirleyin',
            'real-time-monitoring': 'Gerçek Zamanlı İzleme',
            'real-time-monitoring-desc': 'Şüpheli aktiviteler için anlık uyarılarla sürekli işlem izleme',
            'how-it-works-title': 'Cüzdan Taraması Nasıl Çalışır',
            'step1-title': 'Cüzdanı Bağla',
            'step1-desc': 'Tercih ettiğiniz cüzdan sağlayıcısını kullanarak kripto para cüzdanınızı güvenle bağlayın',
            'step2-title': 'Derin Analiz',
            'step2-desc': 'Sistemimiz birden fazla blockchain üzerinde işlem geçmişini ve bağlantıları tarar',
            'step3-title': 'Rapor Al',
            'step3-desc': 'Net öneriler ve uyumluluk durumu ile detaylı risk değerlendirmesi alın',
            'faq-title': 'Sık Sorulan Sorular',
            'faq1-question': 'Kripto para cüzdanları için AML kontrolü nedir?',
            'faq1-answer': 'Bir AML (Kara Para Aklamayı Önleme) kontrolü, karanlık ağ pazarları, yaptırımlar, dolandırıcılıklar ve diğer finansal suçlar gibi yasa dışı faaliyetlerle bağlantıları tanımlayan kripto para cüzdanları ve işlemlerinin detaylı bir risk analizidir. Varlıkların saflığını belirlemeye ve çalınan paralara karşı korunmaya yardımcı olur.',
            'faq2-question': 'Kripto işletmeleri için AML kontrolleri neden önemlidir?',
            'faq2-answer': 'AML kontrolleri kritiktir çünkü para aklamayı ve terör finansmanını önlerken işletinizin kötü niyetli aktörler tarafından sömürülmesini önler. Uyumsuzluk, düzenleyici cezalara, dondurulmuş varlıklara, itibar zararına ve bankacılık ilişkilerinin kaybına neden olabilir.',
            'faq3-question': 'AML kontrol süreci neleri içerir?',
            'faq3-answer': 'AML sürecimiz şunları içerir: yasa dışı faaliyet bağlantılarının olasılığını gösteren risk skorlama, mikserler ve dolandırıcılık gibi kategorileri tanımlayan kaynak analizi, işlem geçmişini inceleyen bağlantı analizi ve gelen ve giden ödemeler için işlem perspektifi analizi.',
            'faq4-question': 'Kripto para biriminde kime AML uyumu gerekir?',
            'faq4-answer': 'Borsalar, saklama cüzdanları, OTC masaları, brokerler, NFT ve DeFi platformları ve işlem işleyen veya müşteri varlıklarını tutan herhangi bir sanal varlık hizmeti sağlayıcısı (VASP) AML düzenlemelerine uyması beklenir.',
            'faq5-question': 'Cüzdan taramanız ne kadar doğru?',
            'faq5-answer': 'Risk skorlamamız, kapsamlı analiz için güvenilir verilere sahip olduğumuzdan emin olarak birden fazla veri kaynağına ve gelişmiş algoritmalara dayanır. Gerçek zamanlı olarak riskleri belirlemeye yardımcı olan küresel kapsama ile anlık kontroller sağlıyoruz.',
            'cta-title': 'Varlıklarınızı güvence altına almaya hazır mısınız?',
            'cta-subtitle': 'Profesyonel AML taraması ile kripto para yatırımlarınızı bugün korumaya başlayın',
            'check-now': 'Cüzdanınızı Şimdi Kontrol Edin',
            'footer': '© 2025 AMLCheker Scan. Tüm hakları saklıdır. Profesyonel AML uyum çözümleri.',
            'choose-wallet': 'Cüzdanınızı Seçin',
            'trust-wallet': 'Trust Wallet',
            'tronlink': 'TronLink',
            'klever-wallet': 'Klever Wallet',
            'mathwallet': 'MathWallet',
            'safepal': 'SafePal',
            'walletconnect': 'WalletConnect'
        },
        'zh': {
            'title': 'AMLCheker Scan | 高级AML加密货币钱包验证',
            'description': '专业的加密货币钱包AML合规检查。使用我们的先进筛查技术验证钱包纯度，检测可疑活动并确保监管合规',
            'features': '功能',
            'how-it-works': '工作原理',
            'faq': '常见问题',
            'hero-title': '高级AML钱包验证',
            'hero-subtitle': '通过专业的加密货币钱包筛查和合规检查保护您的资产',
            'check-wallet': '检查钱包',
            'connect-wallet': '连接钱包',
            'features-title': '全面的钱包安全',
            'risk-scoring': '风险评分',
            'risk-scoring-desc': '基于交易历史和连接的高级算法计算钱包风险百分比',
            'source-analysis': '来源分析',
            'source-analysis-desc': '识别资金来源，包括暗网市场、混币器、诈骗和受制裁实体',
            'real-time-monitoring': '实时监控',
            'real-time-monitoring-desc': '持续交易监控，可疑活动即时警报',
            'how-it-works-title': '钱包筛查如何工作',
            'step1-title': '连接钱包',
            'step1-desc': '使用您偏好的钱包提供商安全连接您的加密货币钱包',
            'step2-title': '深度分析',
            'step2-desc': '我们的系统扫描多个区块链上的交易历史和连接',
            'step3-title': '获取报告',
            'step3-desc': '接收详细的风险评估，包含明确的建议和合规状态',
            'faq-title': '常见问题',
            'faq1-question': '什么是加密货币钱包的AML检查？',
            'faq1-answer': 'AML（反洗钱）检查是对加密货币钱包和交易的详细风险分析，识别与非法活动的联系，如暗网市场、制裁、诈骗和其他金融犯罪。它有助于确定资产纯度并防止被盗币。',
            'faq2-question': '为什么AML检查对加密业务很重要？',
            'faq2-answer': 'AML检查至关重要，因为它们防止洗钱和恐怖主义融资，同时保护您的业务免受恶意行为者利用。不合规可能导致监管处罚、资产冻结、声誉损害和银行关系损失。',
            'faq3-question': 'AML检查过程包括什么？',
            'faq3-answer': '我们的AML流程包括：显示与非法活动连接可能性的风险评分，识别混币器和欺诈等类别的来源分析，审查交易历史的连接分析，以及进出交易视角分析。',
            'faq4-question': '谁需要在加密货币中进行AML合规？',
            'faq4-answer': '交易所、托管钱包、OTC柜台、经纪人、NFT和DeFi平台，以及任何处理交易或持有客户资产的虚拟资产服务提供商（VASP）都应遵守AML法规。',
            'faq5-question': '您的钱包筛查有多准确？',
            'faq5-answer': '我们的风险评分基于多个数据源和高级算法，确保我们拥有可靠的数据进行全面分析。我们提供具有全球覆盖的即时检查，帮助实时识别风险。',
            'cta-title': '准备好保护您的资产了吗？',
            'cta-subtitle': '立即开始通过专业AML筛查保护您的加密货币投资',
            'check-now': '立即检查您的钱包',
            'footer': '© 2025 AMLCheker Scan。保留所有权利。专业AML合规解决方案。',
            'choose-wallet': '选择您的钱包',
            'trust-wallet': 'Trust Wallet',
            'tronlink': 'TronLink',
            'klever-wallet': 'Klever Wallet',
            'mathwallet': 'MathWallet',
            'safepal': 'SafePal',
            'walletconnect': 'WalletConnect'
        },
        'ja': {
            'title': 'AMLCheker Scan | 高度なAML暗号通貨ウォレット検証',
            'description': '暗号通貨ウォレットのプロフェッショナルなAMLコンプライアンスチェック。当社の高度なスクリーニング技術でウォレットの純度を検証し、不審な活動を検出し、規制遵守を確保します',
            'features': '機能',
            'how-it-works': '仕組み',
            'faq': 'よくある質問',
            'hero-title': '高度なAMLウォレット検証',
            'hero-subtitle': 'プロフェッショナルな暗号通貨ウォレットスクリーニングとコンプライアンスチェックで資産を保護',
            'check-wallet': 'ウォレットをチェック',
            'connect-wallet': 'ウォレットを接続',
            'features-title': '包括的なウォレットセキュリティ',
            'risk-scoring': 'リスクスコアリング',
            'risk-scoring-desc': '高度なアルゴリズムが取引履歴と接続に基づいてウォレットのリスク率を計算',
            'source-analysis': 'ソース分析',
            'source-analysis-desc': 'ダークネット市場、ミキサー、詐欺、制裁対象エンティティを含む資金の源泉を特定',
            'real-time-monitoring': 'リアルタイム監視',
            'real-time-monitoring-desc': '不審な活動の即時アラートによる継続的な取引監視',
            'how-it-works-title': 'ウォレットスクリーニングの仕組み',
            'step1-title': 'ウォレットを接続',
            'step1-desc': '好みのウォレットプロバイダーを使用して暗号通貨ウォレットを安全に接続',
            'step2-title': '詳細分析',
            'step2-desc': '当社のシステムは複数のブロックチェーンにわたる取引履歴と接続をスキャン',
            'step3-title': 'レポートを取得',
            'step3-desc': '明確な推奨事項とコンプライアンスステータスを含む詳細なリスク評価を受信',
            'faq-title': 'よくある質問',
            'faq1-question': '暗号通貨ウォレットのAMLチェックとは何ですか？',
            'faq1-answer': 'AML（反マネーロンダリング）チェックは、ダークネット市場、制裁、詐欺、その他の金融犯罪などの違法活動との関連を特定する、暗号通貨ウォレットと取引の詳細なリスク分析です。資産の純度を決定し、盗まれたコインから保護するのに役立ちます。',
            'faq2-question': '暗号ビジネスにとってAMLチェックが重要な理由は？',
            'faq2-answer': 'AMLチェックは、マネーロンダリングとテロ資金調達を防止すると同時に、悪意のある行為者によるビジネスの悪用から保護するために重要です。非遵守は、規制罰則、資産凍結、評判損害、銀行関係の喪失につながる可能性があります。',
            'faq3-question': 'AMLチェックプロセスには何が含まれますか？',
            'faq3-answer': '当社のAMLプロセスには以下が含まれます：違法活動との関連の可能性を示すリスクスコアリング、ミキサーや詐欺などのカテゴリを特定するソース分析、取引履歴をレビューする接続分析、および着信および発信取引の取引視点分析。',
            'faq4-question': '暗号通貨で誰がAMLコンプライアンスを必要としますか？',
            'faq4-answer': '取引所、カストディアルウォレット、OTCデスク、ブローカー、NFTおよびDeFiプラットフォーム、および取引を処理するか顧客資産を保持するあらゆる仮想資産サービスプロバイダー（VASP）はAML規制を遵守することが期待されています。',
            'faq5-question': 'ウォレットスクリーニングの精度はどのくらいですか？',
            'faq5-answer': '当社のリスクスコアリングは、包括的な分析のための信頼性の高いデータを確保するために、複数のデータソースと高度なアルゴリズムに基づいています。リアルタイムでリスクを特定するのに役立つグローバルカバレッジによる即時チェックを提供します。',
            'cta-title': '資産を保護する準備はできましたか？',
            'cta-subtitle': 'プロフェッショナルなAMLスクリーニングで今日から暗号通貨投資を保護し始めましょう',
            'check-now': '今すぐウォレットをチェック',
            'footer': '© 2025 AMLCheker Scan。全著作権所有。プロフェッショナルAMLコンプライアンスソリューション。',
            'choose-wallet': 'ウォレットを選択',
            'trust-wallet': 'Trust Wallet',
            'tronlink': 'TronLink',
            'klever-wallet': 'Klever Wallet',
            'mathwallet': 'MathWallet',
            'safepal': 'SafePal',
            'walletconnect': 'WalletConnect'
        },
        'ar': {
            'title': 'AMLCheker Scan | التحقق المتقدم من محافظ العملات المشفرة لمكافحة غسل الأموال',
            'description': 'فحص امتثال احترافي لمكافحة غسل الأموال لمحافظ العملات المشفرة. تحقق من نقاء المحفظة، واكتشف النشاط المشبوه، وضمن الامتثال التنظيمي مع تقنية الفحص المتقدمة لدينا',
            'features': 'الميزات',
            'how-it-works': 'كيف يعمل',
            'faq': 'الأسئلة الشائعة',
            'hero-title': 'التحقق المتقدم من محافظ مكافحة غسل الأموال',
            'hero-subtitle': 'احمِ أصولك مع الفحص الاحترافي لمحافظ العملات المشفرة والتحقق من الامتثال',
            'check-wallet': 'فحص المحفظة',
            'connect-wallet': 'ربط المحفظة',
            'features-title': 'أمان شامل للمحفظة',
            'risk-scoring': 'تقييم المخاطر',
            'risk-scoring-desc': 'تحسب الخوارزميات المتقدمة نسبة مخاطر المحفظة بناءً على سجل المعاملات والاتصالات',
            'source-analysis': 'تحليل المصدر',
            'source-analysis-desc': 'حدد مصادر الأموال بما في ذلك أسواق الشبكة المظلمة، وبرامج الخلط، واحتيال، والكيانات الخاضعة للعقوبات',
            'real-time-monitoring': 'المراقبة في الوقت الحقيقي',
            'real-time-monitoring-desc': 'مراقبة مستمرة للمعاملات مع تنبيهات فورية للأنشطة المشبوهة',
            'how-it-works-title': 'كيف يعمل فحص المحفظة',
            'step1-title': 'ربط المحفظة',
            'step1-desc': 'اربط محفظة العملات المشفرة الخاصة بك بأمان باستخدام مزود المحفظة المفضل لديك',
            'step2-title': 'تحليل عميق',
            'step2-desc': 'يُجري نظامنا فحصًا لسجل المعاملات والاتصالات عبر سلاسل الكتل المتعددة',
            'step3-title': 'الحصول على التقرير',
            'step3-desc': 'تلقي تقييم مخاطر مفصل مع توصيات واضحة وحالة الامتثال',
            'faq-title': 'الأسئلة الشائعة',
            'faq1-question': 'ما هو فحص مكافحة غسل الأموال لمحافظ العملات المشفرة؟',
            'faq1-answer': 'فحص مكافحة غسل الأموال هو تحليل مفصل للمخاطر لمحافظ العملات المشفرة والمعاملات التي تحدد الروابط بالأنشطة غير المشروعة مثل أسواق الشبكة المظلمة والعقوبات والاحتيال والجرائم المالية الأخرى. فهو يساعد في تحديد نقاء الأصول والحماية من العملات المسروقة.',
            'faq2-question': 'لماذا تعتبر فحوصات مكافحة غسل الأموال مهمة لأعمال التشفير؟',
            'faq2-answer': 'فحوصات مكافحة غسل الأموال ضرورية لأنها تمنع غسل الأموال وتمويل الإرهاب مع حماية عملك من الاستغلال من قبل الجهات الخبيثة. يمكن أن يؤدي عدم الامتثال إلى عقوبات تنظيمية وتجميد الأصول وتلف السمعة وفقدان العلاقات المصرفية.',
            'faq3-question': 'ماذا تتضمن عملية فحص مكافحة غسل الأموال؟',
            'faq3-answer': 'تتضمن عملية مكافحة غسل الأموال لدينا: تقييم المخاطر الذي يظهر احتمالية الاتصالات بالنشاط غير المشروع، وتحليل المصدر الذي يحدد فئات مثل برامج الخلط والاحتيال، وتحليل الاتصالات الذي يراجع سجل المعاملات، وتحليل منظور المعاملات للمدفوعات الواردة والصادرة.',
            'faq4-question': 'من يحتاج إلى الامتثال لمكافحة غسل الأموال في العملات المشفرة؟',
            'faq4-answer': 'من المتوقع أن تلتزم البورصات والمحافظ الوصائية ومكاتب التداول خارج البورصة والوسطاء ومنصات NFT وDeFi وأي مزود خدمة أصول افتراضية (VASP) يعالج المعاملات أو يحتفظ بأصول العملاء بلوائح مكافحة غسل الأموال.',
            'faq5-question': 'ما مدى دقة فحص المحفظة الخاص بك؟',
            'faq5-answer': 'يعتمد تقييم المخاطر لدينا على مصادر بيانات متعددة وخوارزميات متقدمة، مما يضمن أن لدينا بيانات موثوقة للتحليل الشامل. نحن نقدم فحوصات فورية مع تغطية عالمية، مما يساعد في تحديد المخاطر في الوقت الفعلي.',
            'cta-title': 'هل أنت مستعد لتأمين أصولك؟',
            'cta-subtitle': 'ابدأ في حماية استثماراتك في العملات المشفرة اليوم مع الفحص الاحترافي لمكافحة غسل الأموال',
            'check-now': 'افحص محفظتك الآن',
            'footer': '© 2025 AMLCheker Scan. جميع الحقوق محفوظة. حلول امتثال احترافية لمكافحة غسل الأموال.',
            'choose-wallet': 'اختر محفظتك',
            'trust-wallet': 'Trust Wallet',
            'tronlink': 'TronLink',
            'klever-wallet': 'Klever Wallet',
            'mathwallet': 'MathWallet',
            'safepal': 'SafePal',
            'walletconnect': 'WalletConnect'
        },
        'de': {
            'title': 'AMLCheker Scan | Erweiterte AML-Krypto-Wallet-Verifizierung',
            'description': 'Professionelle AML-Compliance-Prüfung für Kryptowährungs-Wallets. Überprüfen Sie die Wallet-Reinheit, erkennen Sie verdächtige Aktivitäten und gewährleisten Sie regulatorische Compliance mit unserer fortschrittlichen Screening-Technologie',
            'features': 'Funktionen',
            'how-it-works': 'So funktioniert es',
            'faq': 'FAQ',
            'hero-title': 'Erweiterte AML-Wallet-Verifizierung',
            'hero-subtitle': 'Schützen Sie Ihre Assets mit professionellem Krypto-Wallet-Screening und Compliance-Prüfung',
            'check-wallet': 'Wallet prüfen',
            'connect-wallet': 'Wallet verbinden',
            'features-title': 'Umfassende Wallet-Sicherheit',
            'risk-scoring': 'Risikobewertung',
            'risk-scoring-desc': 'Fortschrittliche Algorithmen berechnen den Wallet-Risikoprozent basierend auf Transaktionsverlauf und Verbindungen',
            'source-analysis': 'Quellenanalyse',
            'source-analysis-desc': 'Identifizieren Sie Geldquellen einschließlich Darknet-Märkten, Mixern, Betrug und sanktionierten Entitäten',
            'real-time-monitoring': 'Echtzeit-Überwachung',
            'real-time-monitoring-desc': 'Kontinuierliche Transaktionsüberwachung mit sofortigen Warnungen bei verdächtigen Aktivitäten',
            'how-it-works-title': 'So funktioniert Wallet-Screening',
            'step1-title': 'Wallet verbinden',
            'step1-desc': 'Verbinden Sie Ihr Krypto-Wallet sicher mit Ihrem bevorzugten Wallet-Anbieter',
            'step2-title': 'Tiefenanalyse',
            'step2-desc': 'Unser System scannt Transaktionsverlauf und Verbindungen über mehrere Blockchains',
            'step3-title': 'Bericht erhalten',
            'step3-desc': 'Erhalten Sie eine detaillierte Risikobewertung mit klaren Empfehlungen und Compliance-Status',
            'faq-title': 'Häufig gestellte Fragen',
            'faq1-question': 'Was ist eine AML-Prüfung für Krypto-Wallets?',
            'faq1-answer': 'Eine AML (Anti-Geldwäsche)-Prüfung ist eine detaillierte Risikoanalyse von Krypto-Wallets und Transaktionen, die Verbindungen zu illegalen Aktivitäten wie Darknet-Märkten, Sanktionen, Betrug und anderen Finanzverbrechen identifiziert. Es hilft, die Reinheit von Vermögenswerten zu bestimmen und vor gestohlenen Münzen zu schützen.',
            'faq2-question': 'Warum sind AML-Prüfungen für Krypto-Unternehmen wichtig?',
            'faq2-answer': 'AML-Prüfungen sind entscheidend, da sie Geldwäsche und Terrorismusfinanzierung verhindern und gleichzeitig Ihr Unternehmen vor Ausbeutung durch böswillige Akteure schützen. Nichteinhaltung kann zu regulatorischen Strafen, eingefrorenen Vermögenswerten, Reputationsschäden und Verlust von Bankbeziehungen führen.',
            'faq3-question': 'Was beinhaltet der AML-Prüfprozess?',
            'faq3-answer': 'Unser AML-Prozess umfasst: Risikobewertung, die die Wahrscheinlichkeit von Verbindungen zu illegalen Aktivitäten zeigt, Quellenanalyse, die Kategorien wie Mixer und Betrug identifiziert, Verbindungsanalyse, die den Transaktionsverlauf überprüft, und Transaktionsperspektivenanalyse für eingehende und ausgehende Zahlungen.',
            'faq4-question': 'Wer benötigt AML-Compliance in Kryptowährungen?',
            'faq4-answer': 'Börsen, Custodial Wallets, OTC-Desks, Broker, NFT- und DeFi-Plattformen und jeder Virtual Asset Service Provider (VASP), der Transaktionen verarbeitet oder Kundenvermögen verwaltet, wird voraussichtlich AML-Vorschriften einhalten.',
            'faq5-question': 'Wie genau ist Ihr Wallet-Screening?',
            'faq5-answer': 'Unsere Risikobewertung basiert auf mehreren Datenquellen und fortschrittlichen Algorithmen, um zuverlässige Daten für umfassende Analysen zu gewährleisten. Wir bieten sofortige Prüfungen mit globaler Abdeckung, um Risiken in Echtzeit zu identifizieren.',
            'cta-title': 'Bereit, Ihre Assets zu sichern?',
            'cta-subtitle': 'Beginnen Sie noch heute mit dem Schutz Ihrer Krypto-Investitionen durch professionelles AML-Screening',
            'check-now': 'Jetzt Wallet prüfen',
            'footer': '© 2025 AMLCheker Scan. Alle Rechte vorbehalten. Professionelle AML-Compliance-Lösungen.',
            'choose-wallet': 'Wählen Sie Ihr Wallet',
            'trust-wallet': 'Trust Wallet',
            'tronlink': 'TronLink',
            'klever-wallet': 'Klever Wallet',
            'mathwallet': 'MathWallet',
            'safepal': 'SafePal',
            'walletconnect': 'WalletConnect'
        }
    };

    // Определение языка браузера пользователя
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Поддерживаемые языки
        const supportedLangs = ['ru', 'es', 'tr', 'zh', 'ja', 'ar', 'de'];
        
        if (supportedLangs.includes(langCode)) {
            return langCode;
        }
        
        // По умолчанию английский
        return 'en';
    }

    // Функция перевода страницы
    function translatePage(lang) {
        if (lang === 'en') return; // Если английский, ничего не делаем
        
        const langData = translations[lang];
        if (!langData) return;

        // Обновляем мета-данные
        document.title = langData.title;
        document.querySelector('meta[name="description"]').setAttribute('content', langData.description);
        document.documentElement.lang = lang;

        // Функция для перевода элемента
        function translateElement(element, key) {
            if (langData[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = langData[key];
                } else {
                    element.textContent = langData[key];
                }
            }
        }

        // Навигация
        const navLinks = document.querySelectorAll('nav a');
        translateElement(navLinks[0], 'features');
        translateElement(navLinks[1], 'how-it-works');
        translateElement(navLinks[2], 'faq');

        // Hero секция
        const heroTitle = document.querySelector('.hero-gradient h1');
        const heroSubtitle = document.querySelector('.hero-gradient p');
        const heroButtons = document.querySelectorAll('.hero-gradient button');
        
        translateElement(heroTitle, 'hero-title');
        translateElement(heroSubtitle, 'hero-subtitle');
        translateElement(heroButtons[0], 'check-wallet');
        translateElement(heroButtons[1], 'connect-wallet');

        // Features секция
        const featuresTitle = document.querySelector('#features h2');
        translateElement(featuresTitle, 'features-title');

        const featureCards = document.querySelectorAll('.feature-card');
        translateElement(featureCards[0].querySelector('h3'), 'risk-scoring');
        translateElement(featureCards[0].querySelector('p'), 'risk-scoring-desc');
        translateElement(featureCards[1].querySelector('h3'), 'source-analysis');
        translateElement(featureCards[1].querySelector('p'), 'source-analysis-desc');
        translateElement(featureCards[2].querySelector('h3'), 'real-time-monitoring');
        translateElement(featureCards[2].querySelector('p'), 'real-time-monitoring-desc');

        // How It Works
        const howItWorksTitle = document.querySelector('#how-it-works h2');
        translateElement(howItWorksTitle, 'how-it-works-title');

        const steps = document.querySelectorAll('#how-it-works .flex > div');
        translateElement(steps[0].querySelector('h3'), 'step1-title');
        translateElement(steps[0].querySelector('p'), 'step1-desc');
        translateElement(steps[1].querySelector('h3'), 'step2-title');
        translateElement(steps[1].querySelector('p'), 'step2-desc');
        translateElement(steps[2].querySelector('h3'), 'step3-title');
        translateElement(steps[2].querySelector('p'), 'step3-desc');

        // FAQ
        const faqTitle = document.querySelector('#faq h2');
        translateElement(faqTitle, 'faq-title');

        const faqItems = document.querySelectorAll('.faq-item');
        translateElement(faqItems[0].querySelector('h3'), 'faq1-question');
        translateElement(faqItems[0].querySelector('.faq-answer p'), 'faq1-answer');
        translateElement(faqItems[1].querySelector('h3'), 'faq2-question');
        translateElement(faqItems[1].querySelector('.faq-answer p'), 'faq2-answer');
        translateElement(faqItems[2].querySelector('h3'), 'faq3-question');
        translateElement(faqItems[2].querySelector('.faq-answer p'), 'faq3-answer');
        translateElement(faqItems[3].querySelector('h3'), 'faq4-question');
        translateElement(faqItems[3].querySelector('.faq-answer p'), 'faq4-answer');
        translateElement(faqItems[4].querySelector('h3'), 'faq5-question');
        translateElement(faqItems[4].querySelector('.faq-answer p'), 'faq5-answer');

        // CTA секция
        const ctaTitle = document.querySelector('.hero-gradient:last-child h2');
        const ctaSubtitle = document.querySelector('.hero-gradient:last-child p');
        const ctaButton = document.querySelector('.hero-gradient:last-child button');
        
        translateElement(ctaTitle, 'cta-title');
        translateElement(ctaSubtitle, 'cta-subtitle');
        translateElement(ctaButton, 'check-now');

        // Футер
        const footer = document.querySelector('footer p');
        translateElement(footer, 'footer');

        // Модальное окно
        const modalTitle = document.querySelector('#walletModal h2');
        const walletItems = document.querySelectorAll('.wallet-item span');
        
        translateElement(modalTitle, 'choose-wallet');
        translateElement(walletItems[0], 'trust-wallet');
        translateElement(walletItems[1], 'tronlink');
        translateElement(walletItems[2], 'klever-wallet');
        translateElement(walletItems[3], 'mathwallet');
        translateElement(walletItems[4], 'safepal');
        translateElement(walletItems[5], 'walletconnect');
    }

    // Инициализация
    const userLanguage = detectBrowserLanguage();
    translatePage(userLanguage);
    
    // Сохраняем выбранный язык в localStorage для последующих посещений
    localStorage.setItem('preferred-language', userLanguage);
});
