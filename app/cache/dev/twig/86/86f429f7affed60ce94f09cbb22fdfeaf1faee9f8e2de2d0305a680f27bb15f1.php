<?php

/* @Framework/Form/form_errors.html.php */
class __TwigTemplate_563588d4b6b07bcb435401ba329374b1e7d6d55f64b0d5e162d78fabee332ff8 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_b65a588a314039dc54417f86f4f94d5edf33a2efe458abcea607b8b9ccc87edc = $this->env->getExtension("native_profiler");
        $__internal_b65a588a314039dc54417f86f4f94d5edf33a2efe458abcea607b8b9ccc87edc->enter($__internal_b65a588a314039dc54417f86f4f94d5edf33a2efe458abcea607b8b9ccc87edc_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_errors.html.php"));

        // line 1
        echo "<?php if (count(\$errors) > 0): ?>
    <ul>
        <?php foreach (\$errors as \$error): ?>
            <li><?php echo \$error->getMessage() ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif ?>
";
        
        $__internal_b65a588a314039dc54417f86f4f94d5edf33a2efe458abcea607b8b9ccc87edc->leave($__internal_b65a588a314039dc54417f86f4f94d5edf33a2efe458abcea607b8b9ccc87edc_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_errors.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (count($errors) > 0): ?>*/
/*     <ul>*/
/*         <?php foreach ($errors as $error): ?>*/
/*             <li><?php echo $error->getMessage() ?></li>*/
/*         <?php endforeach; ?>*/
/*     </ul>*/
/* <?php endif ?>*/
/* */
